import { enviroment } from '../enviroment/enviroment';
import { ISearchResult } from '../models/search-result';

export class SearchTextService {

  searchResults: ISearchResult[] | undefined;

  context: string | undefined;

  async browseWikipedia(query: string) {
    if(!query) throw Error("Query undefined");

    await this.wikipediaSearch(query);

    // TODO: search detail of each page 
    // and clean it (use puppeteer here)

    // TODO: save the text in the context
  }

  async wikipediaSearch(query: string) {
    if(!query) throw Error("Query undefined");

    try {
      const url = enviroment.wikipediaSearchUrl + query;
      const response = await fetch(this.prefillUrl(url));
      const body = await response.json();
      console.log(body);
    } catch (err) {
      console.error(err);
      throw Error(err);
    }
  }

  private prefillUrl(url: string): string {
    return enviroment.herokuAppUrl + url;
  }
}
