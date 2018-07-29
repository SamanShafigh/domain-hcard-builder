import UserService from '../../service/user-service';
import * as dbdriver from '../../service/dbdriver-service';
import { make } from '../user-controller';
import { InvalidDataError } from '../../lib/error';

import { 
  mockConfig, 
  mockUser, 
  mockCtx, 
  mockCtxWithBody, 
  mockDbDriver } from '../../lib/mock';

let userController;
jest.mock('../../service/dbdriver-service');

beforeAll(async () => {
  // Mocking my DB driver
  dbdriver.makeDbDriver.mockImplementationOnce(() => mockDbDriver)
  // Make my UserService
  const mockDriver = dbdriver.makeDbDriver();
  userController = make(mockConfig, mockDriver);
});

describe('Test user controller', () => {
  test('test get index page', async () => {
    var ctx = Object.assign({}, mockCtx);
    var middleware = await userController.index();
    await middleware(ctx, () => {});

    expect(ctx).toMatchSnapshot()
  });

  test('test submit api', async () => {
    var ctx = Object.assign({}, mockCtxWithBody);
    var middleware = await userController.submit();
    var result = await middleware(ctx, () => {});
    
    expect(ctx).toMatchSnapshot()
  });

  test('test update api', async () => {
    var ctx = Object.assign({}, mockCtxWithBody);
    var middleware = await userController.update();
    var result = await middleware(ctx, () => {});

    expect(ctx).toMatchSnapshot()
  });

  test('test to make sure we throw proper error on invalid data in index action', async () => {
    var ctx = Object.assign({}, mockCtx);
    // Set some invalid data
    ctx.meta.userId = undefined;

    try {
      var middleware = await userController.index();
      await middleware(ctx, () => {});
      expect(true).toBeFalsy();
    } catch (e) {
      expect(e).toBeInstanceOf(InvalidDataError);
      expect(e.message).toBe('User ID is not provided')
    }
  });  

  test('test to make sure we throw proper error on invalid data in submit action', async () => {
    var ctx = Object.assign({}, mockCtxWithBody);
    // Set some invalid data
    ctx.meta.userId = undefined;

    try {
      var middleware = await userController.submit();
      await middleware(ctx, () => {});
      expect(true).toBeFalsy();
    } catch (e) {
      expect(e).toBeInstanceOf(InvalidDataError);
      expect(e.message).toBe('User ID is not provided')
    }
  }); 

  test('test to make sure we throw proper error on invalid data in update action', async () => {
    var ctx = Object.assign({}, mockCtxWithBody);
    // Set some invalid data
    ctx.meta.userId = undefined;

    try {
      var middleware = await userController.update();
      await middleware(ctx, () => {});
      expect(true).toBeFalsy();
    } catch (e) {
      expect(e).toBeInstanceOf(InvalidDataError);
      expect(e.message).toBe('User ID is not provided')
    }
  });     
});