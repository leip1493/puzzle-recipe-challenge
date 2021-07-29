import { compare, hash } from 'bcrypt';

export class AuthHelper {
  static validate(password: string, hashedPassword: string) {
    return compare(password, hashedPassword);
  }

  static hash(password: string) {
    return hash(password, 10);
  }
}
