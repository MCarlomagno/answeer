import { enviroment } from './enviroment/enviroment';
import { ISearchResult } from './models/search-result';
import { AnswerService } from './services/answer.service';
import { SearchTextService } from './services/search.service';
import { cleanWikipediaResults } from './utils/utils';

// HTML Elements
const topicInputElement = document.getElementById(
  'topic-input'
) as HTMLInputElement;
const topicSubmitElement = document.getElementById('topic-submit');
const questionInputElement = document.getElementById(
  'question-input'
) as HTMLInputElement;
const questionSubmitElement = document.getElementById('question-submit');
const outputElement = document.getElementById('output');
const loeaderElement = document.getElementById('loader');

export class Main {
  // tensorflow service that provides
  // QuestionAndAnswer model.
  answerService: AnswerService = new AnswerService();

  // Wikipedia API service to perform
  // questions about some topic.
  searchTextService: SearchTextService = new SearchTextService();

  constructor() {
    this.setup();
  }

  async setup() {
    this.showLoader(true);
    this.setupEventHandling();
    if(enviroment.prod) await this.loadModel();
    this.showLoader(false);
  }

  async loadModel() {
    await this.answerService.loadModel();
  }

  setupEventHandling() {
    if (topicSubmitElement) {
      topicSubmitElement.onclick = this.onTopicSubmit.bind(this);
    }
    if (questionSubmitElement) {
      questionSubmitElement.onclick = this.onQuestionSubmit.bind(this);
    }
  }

  showLoader(show: boolean) {
    if (!loeaderElement) return;
    if (show) loeaderElement.style.visibility = 'visible';
    else loeaderElement.style.visibility = 'hidden';
  }

  async onTopicSubmit() {
    if (!topicInputElement) return;
  
    await this.searchTextService.browseWikipedia(
      topicInputElement.value
    );
  }

  async onQuestionSubmit() {
    if (!questionInputElement || !outputElement) return;

    const answers = await this.answerService.predict(
      questionInputElement.value,
      outputElement.innerText
    );
    console.log(answers);

  }
}

window.onload = () => new Main();