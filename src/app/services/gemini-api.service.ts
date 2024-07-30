import { Injectable } from '@angular/core';
import { GoogleGenerativeAI , GenerativeModel } from '@google/generative-ai';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GeminiApiService {
  
  private genAI: GoogleGenerativeAI;
  private model: GenerativeModel;

  constructor() {
    this.genAI = new GoogleGenerativeAI(environment.apiKey);
    this.model = this.genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  }

  getGenerativeModel(modelName: string) {
    return this.genAI.getGenerativeModel({ model: modelName });
  }

  async testapi(summary:string) {
    const prompt = "Write a summary on "+ summary;

    const result = this.model.generateContent(prompt);
    const response = (await result).response;
    const text = response.text();
    console.log(text);
  }

}
