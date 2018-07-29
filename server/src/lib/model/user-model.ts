import HCardT from '../../type';

/**
 * A user model
 */
export class User implements HCardT.User {
  givenName?: string;
  surname?: string;
  email?: string;
  phone?: string;
  houseNumber?: string;
  street?: string;
  suburb?: string;
  state?: string;
  postcode?: string;
  country?: string;

  constructor() {
    this.givenName = null;
    this.surname = null;
    this.email = null;
    this.phone = null;
    this.houseNumber = null;
    this.street = null;
    this.suburb = null;
    this.state = null;
    this.postcode = null;
    this.country = null;
  }
}

/**
 * A simple ORM for sanitization mechanism of input data. 
 * This function will return User object if data are valid 
 * otherwise will throw an error. 
 * I can use other advanced techniques like an ORM or some third 
 * party validators but will keep it simple for now 
 * @param data 
 */
export default function makeUser(data: any): HCardT.User {
  const user = new User();
  const keys = Object.keys(user);
  Object.keys(data).map(key => {
    if (!keys.includes(key)) {
      throw new Error(`Param ${key} is not defined in User model`);
    }
  });

  return Object.assign(user, data);
};