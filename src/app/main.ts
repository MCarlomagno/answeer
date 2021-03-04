import { enviroment } from '../enviroment/enviroment';
import {
  AnswerService,
  WikipediaAnswerService
} from '../services/answer.service';
import { SearchService } from '../services/search.service';

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
const loaderElement = document.getElementById('loader');

export class Main {
  answerService: AnswerService;
  searchTextService: SearchService;

  constructor(
    // tensorflow service that provides
    // QuestionAndAnswer model.
    answerService: AnswerService,

    // Wikipedia API service to perform
    // questions about some topic.
    searchTextService: SearchService
  ) {
    this.answerService = answerService;
    this.searchTextService = searchTextService;
    this.setup();
  }

  async setup() {
    this.showLoader(true);
    this.setupEventHandling();
    if (enviroment.prod) await this.loadModel();
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
    if (!loaderElement) return;
    if (show) loaderElement.style.visibility = 'visible';
    else loaderElement.style.visibility = 'hidden';
    return loaderElement;
  }

  async onTopicSubmit() {
    if (!topicInputElement) return;

    await this.searchTextService.browseWikipedia(topicInputElement.value);
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
