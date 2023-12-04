const sdk = require('api')('@metaphorapi/v1.0#a4v1t517lp7k31vq');
require('dotenv').config();

const METAPHOR_API_KEY = process.env.METAPHOR_API_KEY;

class MetaphorClient {
  constructor() {
    sdk.auth(METAPHOR_API_KEY);
  }

  async search(query, numResults = 5, includeDomains = ['www.youtube.com']) {
    try {
      console.log('PERFORMING METAPHOR SEARCH');
      const response = await sdk.search({
        query: query,
        numResults: numResults,
        useAutoprompt: true,
        includeDomains: includeDomains,
      });
      return response.data.results;
    } catch (error) {
      console.error('Metaphor Search error:', error);
      throw error;
    } finally {
      console.log('✅ DONE WITH METAPHOR SEARCH ✅');
    }
  }
}

module.exports = new MetaphorClient();
