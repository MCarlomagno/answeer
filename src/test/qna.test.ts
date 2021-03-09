import { Answer } from "@tensorflow-models/qna/dist/question_and_answer";
import { QuestionAndAnswer } from "../services/question-and-answer";

describe('modelExists', () => {
    it('if model does not exist return false', async () => {
        const qna = new QuestionAndAnswer();
        qna.model = undefined;
        expect(qna.modelExists()).toBe(false)
    });

    it('if model exists return true', async () => {
        const qna = new QuestionAndAnswer();

        const mockModel = { 
            findAnswers: (question: any, context: any) => { 
                let answer: Promise<Answer[]> = new Promise<Answer[]>(() => {});
                return answer;
            } 
        };

        qna.model = mockModel;
        expect(qna.modelExists()).toBe(true)
    });
});
