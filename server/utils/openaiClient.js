const OpenAI = require('openai');
require('dotenv').config();

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

class OpenAIClient {
  constructor() {
    this.openai = new OpenAI({
      apiKey: OPENAI_API_KEY,
    });
  }
  async generateTextResponse(messages, model = 'gpt-3.5-turbo-1106') {
    try {
      const response = await this.openai.chat.completions.create({
        messages: messages,
        model: model,
      });
      return response;
    } catch (error) {
      console.error('Error in generating chat response:', error);
      throw error;
    }
  }

  async generateResponse(messages, model = 'gpt-3.5-turbo-1106') {
    try {
      const response = await this.openai.chat.completions.create({
        messages: messages,
        model: model,
        response_format: { type: 'json_object' },
      });
      return response;
    } catch (error) {
      console.error('Error in generating chat response:', error);
      throw error;
    }
  }

  async generateImage(prompt, model = 'dall-e-3') {
    try {
      const response = await this.openai.images.generate({
        model: model,
        prompt: prompt,
        n: 1,
        size: '1024x1024',
        response_format: 'b64_json',
      });
      return response;
    } catch (error) {
      console.error('Error in generating image:', error);
    }
  }
}

module.exports = new OpenAIClient();
