import { ISearchResult } from './models/search-result';
import { AnswerService } from './services/answer.service';
import { SearchTextService } from './services/search.service';

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
    await this.loadModel();
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
    const searchResults: ISearchResult[] = await this.searchTextService.searchTopics(
      topicInputElement.value
    );

    // TODO: the results come with noisy characters
    // that we should remove them with a regex
    // before adding them to our "context".
    //
    // Example: Searching word "Tennis"
    // -------------------------------------------------------------------
    // and &quot;type of administrative entity&quot; is the first
    // suggestion instead of &quot;<span class="searchmatch">tennis</span>
    // singles rating&quot; or other such less irrelevant suggestion, b
    // ased on correlation
    //--------------------------------------------------------------------
    if (searchResults.length > 0 && outputElement) {
      outputElement.innerText = searchResults.map((s) => s.snippet)[0];
    }
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
