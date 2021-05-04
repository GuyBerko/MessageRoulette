import { scrypt, randomBytes } from 'crypto';
import { promisify } from 'util';

const scryptAsync = promisify(scrypt);

class PasswordManager {
  /**
   * to hash get plain text password and encrypt it.
   * @param {*} password - the password to encrypt
   * @returns - encrypted password
   */
  static async toHash(password) {
    const salt = randomBytes(8).toString('hex');
    const buffer = (await scryptAsync(password, salt, 64));

    return `${buffer.toString('hex')}.${salt}`;
  }

  /**
   * compare get two password one encrypted and one not and compare them
   * @param {*} storedPassword - the encrypted password
   * @param {*} suppliedPassword - plain text password
   * @returns - boolean true if equal
   */
  static async compare(storedPassword, suppliedPassword) {
    const [hashedPassword, salt] = storedPassword.split('.');

    const buffer = (await scryptAsync(suppliedPassword, salt, 64));

    return buffer.toString('hex') === hashedPassword;
  }
}

export { PasswordManager };