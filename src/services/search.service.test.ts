import { SearchTextService } from './search.service';

describe('browseWikipedia', () => {
    it('should exist', () =>{
        const service = new SearchTextService();
        expect(service.browseWikipedia).toBeTruthy();
    });

});