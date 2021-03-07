import { AnswerService, MockAnswerService } from '../services/answer.service';
import { MockTextService } from '../services/search.service';
import { Main } from '../app/main';

describe('main', () => {
  // setup dummy services
  const answerService = new MockAnswerService();
  const searchService = new MockTextService();
  const main = new Main(answerService, searchService);

  describe('showLoader', () => {
    it('should return "visible" if true', async () => {
      document.body.innerHTML = `<div id="loader" class="loader"></div>`;
      main.setupDOM();
      const visibility = main.showLoader(true);
      expect(visibility).toBe('visible');
    });

    it('should return "hidden" if false', async () => {
      document.body.innerHTML = `<div id="loader" class="loader"></div>`;
      main.setupDOM();
      const visibility = main.showLoader(false);
      expect(visibility).toBe('hidden');
    });

    it('should return "undefined" if the element does not exist', async () => {
      document.body.innerHTML = '';
      main.setupDOM();
      const visibility = main.showLoader(true);
      expect(visibility).toBeFalsy();
    });
  });
});
