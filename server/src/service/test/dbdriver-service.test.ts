import { MongoDbDriver } from '../../service/dbdriver-service';
import { mockUser, mockMongoDbDriver } from '../../mock';
import HCardT from '../type';

describe('Test dbdriver service', () => {
  test('test mongodb driver to find one user properly', async () => {
    var mongoDbDriver = new MongoDbDriver(mockMongoDbDriver);
    var result = await mongoDbDriver.findOne(
      'User', 
      1234, 
      {options: 'some options'}
    );

    expect(result).toMatchSnapshot();
  });

  test('test mongodb driver to save properly', async () => {
    var mongoDbDriver = new MongoDbDriver(mockMongoDbDriver);
    var result = await mongoDbDriver.save(
      'User', 
      1234, 
      mockUser,
      {options: 'some options'}
    );

    expect(result).toMatchSnapshot();
  });
  
  test('test mongodb driver to update properly', async () => {
    var mongoDbDriver = new MongoDbDriver(mockMongoDbDriver);
    var result = await mongoDbDriver.update(
      'User', 
      1234, 
      mockUser,
      {options: 'some options'}
    );

    expect(result).toMatchSnapshot();
  });
});