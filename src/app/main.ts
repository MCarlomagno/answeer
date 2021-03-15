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
    this.setLoading(true);
    this.setupDOM();
    this.setupEventHandling();
    if (enviroment.prod) await this.loadModel();
    this.setLoading(false);
  }

  async onQuestionSubmit() {
    if (!this.questionInputElement || !this.outputElement) return;
    this.setLoading(true);

    const context = await this.loadTopic();
    console.log(context);
    if (!context) {
      this.setLoading(false);
      return
    };
    
    const answers = await this.qna.predict(
      this.questionInputElement.value,
      context
    );

    if(!answers || answers.length === 0) {
      this.outputElement.innerText = "No answer found :(";
      this.setLoading(false);
      return;
      
    }
      
    this.outputElement.innerText = answers.map(a => a.text).join('\r\n');
    this.setLoading(false); 
  }

  async loadTopic() {
    if (!this.topicInputElement) return;

    let result;
    try {
      result = await this.wikipedia.search(this.topicInputElement.value);
    } catch(err) {
      console.log(err.toString());
    }
    return result;
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
    if (this.questionSubmitElement) {
      this.questionSubmitElement.onclick = this.onQuestionSubmit.bind(this);
    }
  }

  setLoading(show: boolean) {
    if (!this.loaderElement) return;

    let visibility;
    if(show) visibility = this.showLoader();
    else visibility = this.hideLoader();

    return visibility;
  }

  showLoader() {
    if (!this.loaderElement || 
        !this.topicInputElement || 
        !this.questionInputElement) return;

    const visibility = 'visible';
    this.loaderElement.style.visibility = visibility;
    this.topicInputElement.disabled = true;
    this.questionInputElement.disabled = true;
    return visibility;
  }

  hideLoader() {
    if (!this.loaderElement || 
        !this.topicInputElement || 
        !this.questionInputElement) return;
    
    const visibility = 'hidden';
    this.loaderElement.style.visibility = visibility;
    this.topicInputElement.disabled = false;
    this.questionInputElement.disabled = false;
    return visibility;
  }
}
