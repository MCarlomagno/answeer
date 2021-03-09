import { Wikipedia } from '../services/wikipedia';

describe('wikipedia', () => {
  
  describe('search', () => {
    const wikipedia = new Wikipedia();
    it('shold recieve a string parameter and return an other', async () => {
      const result = await wikipedia.search('test');
      expect(typeof result).toBe('string');
    });

    it('should throw an error if no results found', async () => {
      await expect(wikipedia.search('asdasdjwebor')).rejects.toThrow('No results found.');
    });

    it('should throw an error if the query is not specific', async () => {
      await expect(wikipedia.search('any')).rejects.toThrow('The query must be more specific');
    });
  });

});
