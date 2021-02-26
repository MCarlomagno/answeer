import { Main } from './index';

test('app setup', async () => {
    const main = new Main();
    expect(main.setup()).toBeDefined();
});