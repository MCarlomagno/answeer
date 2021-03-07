import { Wikipedia } from '../services/wikipedia';

describe('wikipedia', () => {
  const wikipedia = new Wikipedia();
  describe('search', () => {
    it('shold recieve a string parameter and return an other', async () => {
      const result = await wikipedia.search('test');
      expect(typeof result).toBe('string');
    });

    it('shoould return fixed result for any query', async () => {
      const result = await wikipedia.search('any');

      const expectedResult = `
            ANY may refer to:
             * ANY (magazine), a New York-based architectural journal published from 1993 to 2000
             * Anthony Municipal Airport's IATA airport code
             * Athabasca Northern Railway's reporting mark
             * some and any, for usage of these two English words
             * Universal quantification, a logical quantifier expressed as "given any"`;

      expect(
        result
          ?.replace(/(\r\n|\n|\r)/gm, '')
          .split(' ')
          .join('')
      ).toBe(
        expectedResult
          .replace(/(\r\n|\n|\r)/gm, '')
          .split(' ')
          .join('')
      );
    });
  });
});
