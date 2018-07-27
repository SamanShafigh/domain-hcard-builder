class UserRepository {
  get(userId) {
    return new Promise((resolve, reject) => {
      var data = {
        givenName: 'Samssss',
        surname: 'Fairfax',
        email: 'sam.fairfax@fairfaxmedia.com.au',
        phone: '0292822833',
        houseNumber: '100',
        street: 'Harris Street',
        suburb: 'Pyrmont',
        state: 'NSW',
        postcode: '2009',
        country: 'Australia'
      };
  
      resolve(data);
    });
  }

  save(userId, data) {
    return new Promise((resolve, reject) => {
      resolve(`we are going to save user data ${data}`)
    })
  }
}

module.exports = UserRepository;