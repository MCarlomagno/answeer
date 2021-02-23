
import { ISearchResult } from './models/search-result';
import { TensorflowService } from './services/tensorflow.service';
import { WikipediaService } from './services/wikipedia.service';

// HTML Elements
const topicInputElement = (document.getElementById("topic-input") as HTMLInputElement);
const topicSubmitElement = document.getElementById("topic-submit");
const questionInputElement = (document.getElementById("question-input") as HTMLInputElement);
const questionSubmitElement = document.getElementById("question-submit");
const outputElement = document.getElementById("output");
const loeaderElement = document.getElementById("loader");

export class Main {

    constructor() {
        this.setup();
    }

    async setup() {
        this.setupEventHandling();
        //await this.loadModel();
    }

    async loadModel() {
        await TensorflowService.loadModel();
    }

    setupEventHandling() {
        this.showLoader(false);

        if(topicSubmitElement) {
            topicSubmitElement.onclick = this.onTopicSubmit;
        }
        if(questionSubmitElement) {
            questionSubmitElement.onclick = this.onQuestionSubmit;
        }
    }

    showLoader(show: boolean) {
        if(!loeaderElement) return;
        if(show) loeaderElement.style.visibility = "visible"
        else loeaderElement.style.visibility = "hidden"
    }

    async onTopicSubmit() : Promise<void> {
        if(!topicInputElement) return;

        const searchResults: ISearchResult[] = await this.searchTopics(topicInputElement.value);
        console.log(searchResults.map(s => s.snippet));
    }

    async searchTopics(text: string) {
        return WikipediaService.searchTopics(text);
    }

    onQuestionSubmit() : void {
        if(!questionInputElement) return;

        const text = questionInputElement.value;
        console.log(text);
    }
}