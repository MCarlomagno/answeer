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

    setup() {
        if(topicSubmitElement) {
            topicSubmitElement.onclick = this.onTopicSubmit;
        }
        if(questionSubmitElement) {
            questionSubmitElement.onclick = this.onQuestionSubmit;
        }
    }

    onTopicSubmit() {
        console.log("performs topic search");
    }

    onQuestionSubmit() {
        console.log("performs question answer");
    }
}