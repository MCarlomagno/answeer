import { Main } from './app/main';
import { WikipediaAnswerService } from './services/answer.service';
import { SearchService, SearchTextService } from './services/search.service';

const answerService = new WikipediaAnswerService();
const searchServcice = new SearchTextService();

window.onload = () => new Main(answerService, searchServcice);