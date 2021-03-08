import * as qna from '@tensorflow-models/qna';
import { Answer } from '@tensorflow-models/qna/dist/question_and_answer';

export class QuestionAndAnswer {
  model: qna.QuestionAndAnswer | undefined;

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

  async predict(
    question: string,
    context: string
  ): Promise<Answer[] | undefined> {
    return await this.model?.findAnswers(question, context);
  }
}
