/**
 * Required External Modules and Interfaces
 */
import express, { Request, Response } from 'express';
import * as UserService from '../services/user.service';
import { UserBase, User } from '../types';

/**
 * Router Definition
 */
const userRouter = express.Router();

/**
 * Controller Definitions
 */

// GET items
userRouter.get('/', async (request: Request, response: Response) => {
  try {
    const users: User[] = await UserService.findAll();
    response.status(200).send(users);
  } catch (e: any) {
    response.status(500).send(e.message);
  }
});

// GET items/:id
userRouter.get('/:id', async (request: Request, response: Response) => {
  const id: number = parseInt(request.params.id, 10);

  try {
    const user: User = await UserService.find(id);
    if (user) {
      return response.status(200).send(user);
    }

    response.status(404).send('Item not found');
  } catch (e: any) {
    response.status(500).send(e.message);
  }
});

userRouter.get('/all/:id', async (request: Request, response: Response) => {
  const id: number = parseInt(request.params.id, 10);

  try {
    const users = await UserService.findByRelation(id);
    if (users) {
      return response.status(200).send(users);
    }
    response.status(404).send('Item not found');
  } catch (e: any) {
    response.status(500).send(e.message);
  }
});

// POST items
userRouter.post('/', async (req: Request, res: Response) => {
  try {
    const user: UserBase = req.body;
    const newUser = await UserService.create(user);

    res.status(201).json(newUser);
  } catch (e: any) {
    res.status(500).send(e.message);
  }
});

//Update the user
// PUT items/:id
userRouter.put('/:id', async (request: Request, response: Response) => {
  const id: number = parseInt(request.params.id, 10);
  try {
    const userUpdate: User = request.body;
    const exisitingUser: User = await UserService.find(id);
    if (exisitingUser) {
      const updatedUser = await UserService.update(id, userUpdate);
      return response.status(200).json(updatedUser);
    }

    const newUser = await UserService.create(userUpdate);
    response.status(201).json(newUser);
  } catch (e: any) {
    response.status(500).send(e.message);
  }
});

// DELETE items/:id
userRouter.delete('/:id', async (request: Request, response: Response) => {
  try {
    const id: number = parseInt(request.params.id, 10);
    await UserService.remove(id);

    response.sendStatus(204);
  } catch (e: any) {
    response.status(500).send(e.message);
  }
});

export { userRouter };
