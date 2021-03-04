import { enviroment } from '../enviroment/enviroment';
import { ISearchResult } from '../models/search-result';

export abstract class SearchService {
  abstract searchResults: ISearchResult[] | undefined;
  abstract context: string | undefined;
  abstract browseWikipedia(query: string): Promise<void>;
  abstract wikipediaSearch(query: string): Promise<void>;
}

export class SearchTextService extends SearchService {
  searchResults: ISearchResult[] | undefined;
  context: string | undefined;

  async browseWikipedia(query: string) {
    if (!query) throw Error('Query undefined');
    await this.wikipediaSearch(query);
  }

  async wikipediaSearch(query: string) {
    if (!query) throw Error('Query undefined');
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

// mock service for testing
export class MockTextService extends SearchService {
  searchResults: ISearchResult[] | undefined;
  context: string | undefined;
  async browseWikipedia(query: string) {}
  async wikipediaSearch(query: string) {}

}