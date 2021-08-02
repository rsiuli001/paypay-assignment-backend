// src/users/user.service.ts

/**
 * Data Model Interfaces
 */
import { PRService } from '.';
import { UserDB } from '../../constants';
import { User, UserBase } from '../types';

/**
 * In-Memory Store
 */

/**
 * Service Methods
 */
const findAll = async (): Promise<User[]> => Object.values(UserDB);

const find = async (id: number): Promise<User> => UserDB[id];

const findByRelation = async (id: number): Promise<User[]> => {
  const users = Object.values(UserDB);
  const pr = await PRService.findMyPR(id);
  if (pr.length > 0) {
    const reviewrId = pr[0].reviewerId;
    return users.filter((user: User) => user.id === id || user.id === reviewrId);
  } else {
    return users.filter((user: User) => user.id === id);
  }
};

const create = async (newUser: UserBase): Promise<User> => {
  const newId = new Date().valueOf();
  UserDB[newId] = {
    id: newId,
    ...newUser,
  };

  return UserDB[newId];
};

const update = async (id: number, userUpdate: UserBase): Promise<User | null> => {
  const user = await find(id);
  if (!user) {
    return null;
  }

  UserDB[id] = { id, ...userUpdate };
  return UserDB[id];
};

const remove = async (id: number): Promise<null | void> => {
  const user = await find(id);
  if (!user) {
    return null;
  }

  delete UserDB[id];
};

export { findAll, findByRelation, find, create, update, remove };
