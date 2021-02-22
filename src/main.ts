import * as qna from '@tensorflow-models/qna';
import { WikipediaService } from './services/wikipedia.service';
// HTML Elements
const topicInputElement = document.getElementById("topic-input");
const topicSubmitElement = document.getElementById("topic-submit");
const questionInputElement = document.getElementById("question-input");
const questionSubmitElement = document.getElementById("question-submit");
const outputElement = document.getElementById("output");
const loeaderElement = document.getElementById("loader");

export class Main {


    model!: qna.QuestionAndAnswer;

    constructor() {
        this.setup();
    }

    async setup() {
        this.setupEventHandling();
        await this.testWikipediaApi();
        await this.loadModel();
    }

    async testWikipediaApi() {
        await WikipediaService.testFetch();
    }

    setupEventHandling() {
        if(topicSubmitElement) {
            topicSubmitElement.onclick = this.onTopicSubmit;
        }
        if(questionSubmitElement) {
            questionSubmitElement.onclick = this.onQuestionSubmit;
        }
    }

    showLoader(show: boolean) {
        // the loader element does not exist.
        if(!loeaderElement) return;

        if(show) {
            loeaderElement.style.visibility = "visible";
            return;
        }
        
        loeaderElement.style.visibility = "hidden";
    }

    async loadModel() {
        this.showLoader(true);
        try {
            this.model = await qna.load();
        }catch {
            console.log("an error ocurred loading the model.");
        }
        this.showLoader(false);
    }

    onTopicSubmit() {
        console.log("performs topic search");
    }

    onQuestionSubmit() {
        console.log("performs question answer");
    }
}