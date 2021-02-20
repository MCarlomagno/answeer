import * as qna from '@tensorflow-models/qna';
// HTML Elements
const topicInputElement = document.getElementById("topic-input");
const topicSubmitElement = document.getElementById("topic-submit");
const questionInputElement = document.getElementById("question-input");
const questionSubmitElement = document.getElementById("question-submit");
const outputElement = document.getElementById("output");

export class Main {
    constructor() {
        this.setup();
    }

    async setup() {
        if(topicSubmitElement) {
            topicSubmitElement.onclick = this.onTopicSubmit;
        }
        if(questionSubmitElement) {
            questionSubmitElement.onclick = this.onQuestionSubmit;
        }

        const model = await qna.load();
        console.log("model loaded")
    }

    onTopicSubmit() {
        console.log("performs topic search");
    }

    onQuestionSubmit() {
        console.log("performs question answer");
    }
}