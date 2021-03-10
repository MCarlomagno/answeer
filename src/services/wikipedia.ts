import { enviroment } from '../enviroment/enviroment';
import wtf from 'wtf_wikipedia';

export class Wikipedia {
  context: string | undefined;

  async search(query: string) {
    if (!query) throw Error('Query undefined');

    const response = await wtf.fetch(query);
    if(!response) throw new Error('No results found.');

    const isAmbiguous = this.isAmbiguous(query, response.text());
    if(isAmbiguous) throw new Error('The query must be more specific')

    this.context = this.firstParagraph(response);
    return this.context;
  }

  getContext() {
    return this.context;
  }

  firstParagraph(response: wtf.Document) {
    return response.paragraph(0).text();
  }

  isAmbiguous(query: string, response: string) {
    const responseLowerCase = response.toLowerCase();
    return responseLowerCase.startsWith(`${query.toLowerCase()} may refer to:`)
  }

}