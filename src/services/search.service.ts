import { enviroment } from '../enviroment/enviroment';
import { ISearchResult } from '../models/search-result';

export class SearchTextService {
  async searchTopics(query: string): Promise<ISearchResult[]> {
    try {
      const url = enviroment.searchEndpoint + query;
      const response = await fetch(this.prefillUrl(url));
      const body = await response.json();
      return body.query.search;
    } catch (err) {
      console.log(err);
      return [];
    }
  }

  private prefillUrl(url: string): string {
    return enviroment.herokuAppUrl + url;
  }
}
