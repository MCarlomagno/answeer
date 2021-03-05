import { enviroment } from '../enviroment/enviroment';
import {
  AnswerService,
  WikipediaAnswerService
} from '../services/answer.service';
import { SearchService } from '../services/search.service';

export class Main {
  // HTML Elements
  topicInputElement: HTMLInputElement | undefined | null;
  topicSubmitElement: HTMLElement | undefined | null;
  questionInputElement: HTMLInputElement | undefined | null;
  questionSubmitElement: HTMLElement | undefined | null;
  outputElement: HTMLElement | undefined | null;
  loaderElement: HTMLElement | undefined | null;

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
    this.setupDOM();
    this.setupEventHandling();
    if (enviroment.prod) await this.loadModel();
    this.showLoader(false);
  }

  async loadModel() {
    await this.answerService.loadModel();
  }

  setupDOM() {
    // HTML Elements
    this.topicInputElement = document.getElementById(
      'topic-input'
    ) as HTMLInputElement;
    this.topicSubmitElement = document.getElementById('topic-submit');
    this.questionInputElement = document.getElementById(
      'question-input'
    ) as HTMLInputElement;
    this.questionSubmitElement = document.getElementById('question-submit');
    this.outputElement = document.getElementById('output');
    this.loaderElement = document.getElementById('loader');
  }

  setupEventHandling() {
    if (this.topicSubmitElement) {
      this.topicSubmitElement.onclick = this.onTopicSubmit.bind(this);
    }
    if (this.questionSubmitElement) {
      this.questionSubmitElement.onclick = this.onQuestionSubmit.bind(this);
    }
  }

  showLoader(show: boolean) {
    if (!this.loaderElement) return;

    const visibility = show ? 'visible' : 'hidden';
    this.loaderElement.style.visibility = visibility;

    return visibility;
  }

  async onTopicSubmit() {
    if (!this.topicInputElement) return;

    await this.searchTextService.browseWikipedia(this.topicInputElement.value);
  }

  async onQuestionSubmit() {
    if (!this.questionInputElement || !this.outputElement) return;

    const answers = await this.answerService.predict(
      this.questionInputElement.value,
      this.outputElement.innerText
    );

    console.log(answers);
  }
}
