import makeUser from '../user-model';
import { mockUser, mockInvalidUser } from '../../mock';

describe('Test user maker', () => {
  test('test make user object with all provided variables', () => {
    expect(makeUser(mockUser)).toMatchSnapshot();
  });

  test('test make user object with some variables', () => {
    const data = {
      givenName: 'givenName',
      email: 'email',
      houseNumber: 'houseNumber',
      suburb: 'suburb',
      postcode: 'postcode',
    };
    expect(makeUser(data)).toMatchSnapshot();
  });

  test('test make user object with some invalid variables', () => {
    function failToMakeUser() {
      makeUser(mockInvalidUser)
    }
    expect(failToMakeUser).toThrowError(/is not defined/);
  });
});