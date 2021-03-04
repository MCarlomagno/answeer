import * as qna from '@tensorflow-models/qna';
import { Answer } from '@tensorflow-models/qna/dist/question_and_answer';

export abstract class AnswerService {
  abstract loadModel(): Promise<void>;
  abstract modelExists(): boolean;
  abstract predict(question: string, context: string): Promise<Answer[] | undefined>;
}

export class WikipediaAnswerService extends AnswerService{

  model: qna.QuestionAndAnswer| undefined;

  async loadModel() {
    try {
      this.model = await qna.load();
    } catch {
      console.log('An error ocurred loading the model.');
    }
  }

  modelExists(): boolean {
    return !!this.model;
  }

  /**
   * Returns an array of answers based on the given context text
   * and the question.
   *
   * @param question (String) the question text
   * @param context (String) text that qna model uses to guess the answer
   */
  async predict(
    question: string,
    context: string
  ): Promise<Answer[] | undefined> {
    return await this.model?.findAnswers(question, context);
  }
}


// mock service for testing
export class MockAnswerService extends AnswerService{

  model: string | undefined;

  async loadModel() {
    this.model = "model";
  }

  modelExists(): boolean {
    return !!this.model;
  }
  async predict(
    question: string,
    context: string
  ): Promise<Answer[] | undefined> { return []}
}
