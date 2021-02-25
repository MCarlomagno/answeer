import * as qna from '@tensorflow-models/qna';
import { Answer } from '@tensorflow-models/qna/dist/question_and_answer';

export class AnswerService {
  model?: qna.QuestionAndAnswer;

  async loadModel() {
    try {
      this.model = await qna.load();
    } catch {
      console.log('An error ocurred loading the model.');
    }
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
