import makeUser from './user-model';

describe('Test user maker', () => {
  test('test make user object with all provided variables', () => {
    const data = {
      givenName: 'givenName',
      surname: 'surname',
      email: 'email',
      phone: 'phone',
      houseNumber: 'houseNumber',
      street: 'street',
      suburb: 'suburb',
      state: 'state',
      postcode: 'postcode',
      country: 'country'
    };
    expect(makeUser(data)).toMatchSnapshot();
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
      const data = {
        givenName: 'givenName',
        email: 'email',
        houseNumber: 'houseNumber',
        suburb: 'suburb',
        postcode: 'postcode',
        invalidData: 'some Invalid data'
      };
  
      makeUser(data)
    }
    expect(failToMakeUser).toThrowError(/is not defined/);
  });
});