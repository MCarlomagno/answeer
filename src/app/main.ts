import { IFFT } from '@tensorflow/tfjs';
import { enviroment } from '../enviroment/enviroment';
import { QuestionAndAnswer } from '../services/question-and-answer';
import { Wikipedia } from '../services/wikipedia';

export class Main {
  // HTML Elements
  topicInputElement: HTMLInputElement | undefined | null;
  topicSubmitElement: HTMLElement | undefined | null;
  questionInputElement: HTMLInputElement | undefined | null;
  questionSubmitElement: HTMLElement | undefined | null;
  outputElement: HTMLElement | undefined | null;
  loaderElement: HTMLElement | undefined | null;

  qna: QuestionAndAnswer;
  wikipedia: Wikipedia;

  constructor(
    // tensorflow service that provides
    // QuestionAndAnswer model.
    qna: QuestionAndAnswer,

    // Wikipedia API service to perform
    // questions about some topic.
    wikipedia: Wikipedia
  ) {
    this.qna = qna;
    this.wikipedia = wikipedia;
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
    await this.qna.loadModel();
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

    this.showLoader(true);
    let result;
    try {
      result = await this.wikipedia.search(this.topicInputElement.value);
    } catch(err) {
      result = err.toString();
    }

    this.showLoader(false);
  }

  async onQuestionSubmit() {
    if (!this.questionInputElement || !this.outputElement) return;
    this.showLoader(true);

    const context = this.wikipedia.getContext();
    if (!context) {
      this.showLoader(false);
      return
    };
    
    const answers = await this.qna.predict(
      this.questionInputElement.value,
      context
    );

    if(!answers || answers.length === 0) {
      this.outputElement.innerText = "No answer found :(";
      this.showLoader(false);
      return;
      
    }
      
    this.outputElement.innerText = answers.map(a => a.text).join('\r\n');
    this.showLoader(false);
    
  }
}
