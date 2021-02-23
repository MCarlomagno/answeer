
import * as qna from '@tensorflow-models/qna';

export class TensorflowService {

    static model: qna.QuestionAndAnswer;

    static async loadModel(){
        try {
            this.model = await qna.load();
        }catch {
            console.log("an error ocurred loading the model.");
        }
    }

}