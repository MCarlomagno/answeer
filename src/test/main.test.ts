

import { Main } from '../app/main';
import { QuestionAndAnswer } from '../services/question-and-answer';
import { Wikipedia } from '../services/wikipedia';

describe('main', () => {
  // setup dummy services
  const questionAndAnswer = new QuestionAndAnswer();
  const wikipedia = new Wikipedia();
  const main = new Main(questionAndAnswer, wikipedia);

  document.body.innerHTML = `<body>
      <div id="loader" class="loader"></div>

        <p id=subtitle class="subtitle">
          This is a web application that ask questions with a given topic by 
          using Natural language processing and Wikipedia API.
        </p>

        <div>
          <div class="input-button">
            <label class="mdc-text-field mdc-text-field--filled">
              <span class="mdc-text-field__ripple"></span>
              <span class="mdc-floating-label" id="topic">topic</span>
              <input id="topic-input" class="mdc-text-field__input" type="search" aria-labelledby="topic-aria-label">
              <span class="mdc-line-ripple"></span>
            </label>
          </div>
      
          <div class="input-button">
            <label class="mdc-text-field mdc-text-field--filled">
              <span class="mdc-text-field__ripple"></span>
              <span class="mdc-floating-label" id="question">question</span>
              <input id="question-input"  class="mdc-text-field__input" type="search" aria-labelledby="question-aria-label">
              <span class="mdc-line-ripple"></span>
            </label>
          </div>
        </div>
        <div class="input-button">
          <button id="question-submit" type="button" class="mdc-button mdc-button--raised">
            <span class="mdc-button__ripple"></span>
            <span class="mdc-button__label">ask question</span>
          </button>
        </div>

      <p id="output" class="answer"></p>
      <script src="main-bundle.js"></script>
    </body>`;

  describe('showLoader', () => {
    it('should return "visible" if true', async () => {
      main.setupDOM();
      const visibility = main.setLoading(true);
      expect(visibility).toBe('visible');
    });

    it('should return "hidden" if false', async () => {
      main.setupDOM();
      const visibility = main.setLoading(false);
      expect(visibility).toBe('hidden');
    });

    it('should return "undefined" if the element does not exist', async () => {
      document.body.innerHTML = '';
      main.setupDOM();
      const visibility = main.setLoading(true);
      expect(visibility).toBeFalsy();
    });
  });
});
