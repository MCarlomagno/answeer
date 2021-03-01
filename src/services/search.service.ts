import { enviroment } from '../enviroment/enviroment';
import { ISearchResult } from '../models/search-result';

export class SearchTextService {

  searchResults: ISearchResult[] | undefined;

  async searchTopics(query: string): Promise<ISearchResult[]> {
    try {
      const url = enviroment.searchEndpoint + query;
      const response = await fetch(this.prefillUrl(url));
      const body = await response.json();
      this.searchResults = body.query.search;
      return body.query.search;
    } catch (err) {
      console.error(err);
      throw Error(err);
    }
  }

  async loadTopic(pageId: number) {
    if(!pageId) throw Error("Page id undefined");

    try {
      const url = enviroment.loadTopicUrl + pageId;
      const response = await fetch(this.prefillUrl(url));
      const body = await response.json();
      return body.query
    } catch(err) {
      console.error(err);
      throw Error(err);
    }
  }

  private prefillUrl(url: string): string {
    return enviroment.herokuAppUrl + url;
  }
}
