

import { Main } from '../app/main';
import { QuestionAndAnswer } from '../services/question-and-answer';
import { Wikipedia } from '../services/wikipedia';

describe('main', () => {
  // setup dummy services
  const questionAndAnswer = new QuestionAndAnswer();
  const wikipedia = new Wikipedia();
  const main = new Main(questionAndAnswer, wikipedia);

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
