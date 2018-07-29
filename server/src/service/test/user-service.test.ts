import UserService from '../user-service';
import * as dbdriver from '../../service/dbdriver-service';
import { mockUser, mockDbDriver } from '../../lib/mock';
import HCardT from '../type';

let userService: HCardT.UserService;
jest.mock('../../service/dbdriver-service');

beforeAll(async () => {
  // Mocking my DB driver
  dbdriver.makeDbDriver.mockImplementationOnce(() => mockDbDriver)

  // Make my UserService
  const mockDriver = dbdriver.makeDbDriver();
  userService = new UserService(mockDriver)
});

describe('Test user service', () => {
  test('test to get a user', async () => {
    var result = await userService.getUser(1234);
    expect(result).toMatchSnapshot();
  });

  test('test to save a user', async () => {
    var result = await userService.submitUser(1234, mockUser);
    expect(result).toMatchSnapshot();
  });

  test('test to update a user', async () => {
    var result = await userService.updateUser(1234, 'givenName', 'saman');
    expect(result).toMatchSnapshot();
  });

  test('test to get a null user', async () => {
    // Make my UserService with a driver that returns null
    dbdriver.makeDbDriver.mockImplementationOnce(() => ({
      findOne: (model, query, options) => (Promise.resolve(null)),
    }))
    var userService = new UserService(dbdriver.makeDbDriver())

    var result = await userService.getUser(1234);
    expect(result).toEqual(null);
  });

  test('test to make sure we not exposing critical information', async () => {
    // Make my UserService with a driver that returns some unexpected data
    dbdriver.makeDbDriver.mockImplementationOnce(() => ({
      findOne: (model, query, options) => (
        Promise.resolve({ data: {_id: 'we should not return this'}})
      ),
    }))
    var userService = new UserService(dbdriver.makeDbDriver())

    try {
      await userService.getUser(1234)
      expect(true).toBeFalsy();
    } catch (e) {
      expect(e).toBeInstanceOf(Error);
      expect(e.message).toBe('Param _id is not defined in User model')
    }
  });
});