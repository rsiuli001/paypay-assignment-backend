import { UserDB } from '../../constants';
import { User } from '../types';

const findUserByEmail = async (email: string): Promise<User> => {
  const users: User[] = Object.values(UserDB);
  return users.filter((user) => user.email.toLowerCase() === email.toLowerCase())[0] || null;
};

export { findUserByEmail };
