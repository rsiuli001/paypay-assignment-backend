import express, { Request, Response } from 'express';
import { PRService } from '../services';
import { PerformanceReview, PerformanceReviewBase } from '../types';

const prRouter = express.Router();

/**
 * Controller Definitions
 */
// GET PRs
prRouter.get('/', async (request: Request, response: Response) => {
  try {
    const PRs: PerformanceReview[] = await PRService.findAll();
    response.status(200).send(PRs);
  } catch (e: any) {
    response.status(500).send(e.message);
  }
});

// GET /:id
prRouter.get('/:id', async (request: Request, response: Response) => {
  const id: number = parseInt(request.params.id, 10);

  try {
    const pr: PerformanceReview = await PRService.findById(id);
    if (pr) {
      return response.status(200).send(pr);
    }
    response.status(404).send('Item not found');
  } catch (e: any) {
    response.status(500).send(e.message);
  }
});

// POST items
prRouter.post('/', async (req: Request, res: Response) => {
  try {
    const pr: PerformanceReviewBase = req.body;
    const newPR = await PRService.create(pr);

    res.status(201).json(newPR);
  } catch (e: any) {
    res.status(500).send(e.message);
  }
});

//Update the PR
// PUT items/:id
prRouter.put('/:id', async (request: Request, response: Response) => {
  const id: number = parseInt(request.params.id, 10);
  try {
    const prUpdate: PerformanceReview = request.body;
    const exisitingPR: PerformanceReview = await PRService.findById(id);
    if (exisitingPR) {
      const updatedPR = await PRService.update(id, prUpdate);
      return response.status(200).json(updatedPR);
    }

    const newPR = await PRService.create(prUpdate);
    response.status(201).json(newPR);
  } catch (e: any) {
    response.status(500).send(e.message);
  }
});

// DELETE items/:id
prRouter.delete('/:id', async (request: Request, response: Response) => {
  try {
    const id: number = parseInt(request.params.id, 10);
    await PRService.remove(id);

    response.sendStatus(204);
  } catch (e: any) {
    response.status(500).send(e.message);
  }
});

prRouter.get('/employee/:id', async (request: Request, response: Response) => {
  const empId: number = parseInt(request.params.id, 10);
  try {
    const prs: PerformanceReview[] = await PRService.findByEmpId(empId);
    if (prs) {
      return response.status(200).send(prs);
    }
    response.status(404).send('Item not found');
  } catch (e: any) {
    response.status(500).send(e.message);
  }
});

export { prRouter };
