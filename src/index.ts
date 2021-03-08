import { Main } from './app/main';
import { QuestionAndAnswer } from './services/question-and-answer';
import { Wikipedia } from './services/wikipedia';

const wikipedia = new Wikipedia();
const questionAndAnswer = new QuestionAndAnswer();

window.onload = () => new Main(questionAndAnswer, wikipedia);