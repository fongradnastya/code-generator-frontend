import { faker } from '@faker-js/faker';
import { createAction } from '@reduxjs/toolkit';

import { createComposeActionFn } from './createComposeAction';

jest.mock('@reduxjs/toolkit', () => ({
  createAction: jest.fn(),
}));

describe('createComposeAction', () => {

  it('creates redux action with provided name', () => {
    const actionName = faker.word.verb();
    const actionPrefix = faker.word.noun();

    const composeAction = createComposeActionFn(actionPrefix);
    composeAction(actionName);

    expect(createAction).toHaveBeenCalledWith(`${actionPrefix}/${actionName}`);
  });
});
