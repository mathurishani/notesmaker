import { Component } from '@angular/core';
import * as pdfjsLib from 'pdfjs-dist';
import { GeminiApiService } from '../../services/gemini-api.service';

pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.0.279/pdf.worker.min.js'

@Component({
  selector: 'app-fileupload',
  templateUrl: './fileupload.component.html',
  styleUrl: './fileupload.component.scss'
})
export class FileuploadComponent {

  pdfData: string | null = null;

  constructor(private gemApi:GeminiApiService) {
    
  }

  callAPI(summary:string){
    this.gemApi.testapi(summary);
  }

  async onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;

    if (!input.files || input.files.length === 0) {
      return;
    }

    const file = input.files[0];
    const fileReader = new FileReader();

    fileReader.onload = async () => {
      const typedArray = new Uint8Array(fileReader.result as ArrayBuffer);
      await this.loadPdf(typedArray);
    };

    fileReader.readAsArrayBuffer(file);
  }

  async loadPdf(data: Uint8Array) {
    const loadingTask = pdfjsLib.getDocument({ data });
    const pdf = await loadingTask.promise;
    
    let textContent = '';
    
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const text = await page.getTextContent();
      textContent += text.items.map((item: any) => item.str).join(' ') + '\n';
    }
    
    this.callAPI(textContent);
    console.log(textContent);  // Here you can process the extracted text
  }
  

}
