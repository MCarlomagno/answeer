import { SearchTextService } from './search.service';

describe('loadTopic', () => {
    it('should throw error on falsy parameter', () =>{
        const service = new SearchTextService();
        async function searchUndefined() {
            let some = 0;
            await service.loadTopic(some);
        }
        expect(searchUndefined).rejects.toThrowError("Page id undefined");
    });
});