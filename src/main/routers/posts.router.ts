import express, { Request, response, Response } from 'express';
import { PostService } from '../services';
import { Post } from '../types';

const postsRouter = express.Router();

/**
 * Controller Definitions
 */

// GET all posts
postsRouter.get('/', async (req: Request, res: Response) => {
  try {
    const posts: Post[] = await PostService.findAll();
    res.status(200).send(posts);
  } catch (e: any) {
    response.status(500).send(e.message);
  }
});

// GET items/:id
postsRouter.get('/:id', async (req: Request, res: Response) => {
  const id: string = req.params.id;

  try {
    const post: Post = await PostService.findById(id);
    if (post) {
      res.status(200).send(post);
    }
  } catch (e: any) {
    res.status(500).send(e.message);
  }
});

// GET items/:userId
postsRouter.get('/:userId', async (req: Request, res: Response) => {
  const userId: string = req.params.id;

  try {
    const posts: Post[] = await PostService.findByUser(userId);
    if (posts) {
      res.status(200).send(posts);
    }
  } catch (e: any) {
    res.status(500).send(e.message);
  }
});

// POST items
// create
postsRouter.post('/', async (req: Request, res: Response) => {
  try {
    const post: Post = req.body;
    const newUser = await PostService.create(post);

    res.status(201).json(newUser);
  } catch (e: any) {
    res.status(500).send(e.message);
  }
});

//Update the user
// PUT items/:id
postsRouter.put('/:id', async (request: Request, response: Response) => {
  const id: string = request.params.id;
  try {
    const postUpdate: Post = request.body;
    const exisitingUser: Post = await PostService.findById(id);
    if (exisitingUser) {
      const updatedPost = await PostService.update(id, postUpdate);
      return response.status(200).json(updatedPost);
    }

    const newPost = await PostService.create(postUpdate);
    response.status(201).json(newPost);
  } catch (e: any) {
    response.status(500).send(e.message);
  }
});

// DELETE items/:id
postsRouter.delete('/:id', async (request: Request, response: Response) => {
  try {
    const id: string = request.params.id;
    await PostService.remove(id);

    response.sendStatus(204);
  } catch (e: any) {
    response.status(500).send(e.message);
  }
});

export { postsRouter };
