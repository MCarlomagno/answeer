import { Main } from './app/main';
import { QuestionAndAnswer } from './services/question-and-answer';
import { Wikipedia } from './services/wikipedia';
import {MDCTextField} from '@material/textfield';

const textElements = document.querySelectorAll('.mdc-text-field');
if(textElements) {
    textElements.forEach((el) => {
        const textField = new MDCTextField(el);
    })
}

const wikipedia = new Wikipedia();
const questionAndAnswer = new QuestionAndAnswer();

window.onload = () => new Main(questionAndAnswer, wikipedia);