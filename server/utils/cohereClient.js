const { CohereClient } = require('cohere-ai');

const COHERE_KEY = process.env.COHERE_KEY;

const cohere = new CohereClient({
  token: COHERE_KEY,
});

class CohereAPIClient {
  constructor() {
    this.client = new CohereClient({
      token: COHERE_KEY,
    });
  }
}

module.exports = new CohereAPIClient();
