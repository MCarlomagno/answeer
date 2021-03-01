import { Main } from './index';

describe('main', () => {
    it('should setup app', async () => {
        const main = new Main();
        expect(main.setup()).toBeDefined();
    });
});
