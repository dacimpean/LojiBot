import createAction from './createAction';

describe('Create Action Utility', () => {
  it('should create a new action for redux', () => {
    const newAction = createAction('NEW_TYPE');
    expect(newAction()).toEqual({ type: 'NEW_TYPE' });
  });

  it('should create a nwe action with arguments', () => {
    const createUser = createAction('CREATE_USER', 'email', 'password');
    expect(createUser('test@test.test', '')).toEqual({
      email: 'test@test.test',
      password: '',
      type: 'CREATE_USER',
    });
  });
});
