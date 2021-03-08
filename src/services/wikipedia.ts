import { enviroment } from '../enviroment/enviroment';
import wtf from 'wtf_wikipedia';

export class Wikipedia {
  context: string | undefined;

  async search(query: string) {
    if (!query) throw Error('Query undefined');
    const response = await wtf.fetch(query);
    return response?.text()
  }

}