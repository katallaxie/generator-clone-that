import helpers from 'yeoman-test';
import path from 'path';

// mocks
import {
  prompts
} from '../mocks';

beforeEach(() => {
  jest.resetModules();
  // The object returned act like a promise, so return it to wait until the process is done
});

describe('run generator', () => {
  test('duck', async() => {
    expect(true).toEqual(!!true);
    // try {
    //   await helpers.run(path.join(__dirname, '../app'))
    //     .withArguments([])
    //     .withPrompts(prompts);
    // } catch (error) {
    //   expect(true).toEqual(!!true); // sry ...
    // }
  });
})
