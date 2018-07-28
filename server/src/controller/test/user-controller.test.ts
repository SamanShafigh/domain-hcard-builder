import UserService from '../../service/user-service';
import * as dbdriver from '../../service/dbdriver-service';
import { make } from '../user-controller';
import { 
  mockConfig, 
  mockUser, 
  mockCtx, 
  mockCtxWithBody, 
  mockDbDriver } from '../../mock';

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
});