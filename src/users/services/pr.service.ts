import { prDB } from '../../constants';
import { PerformanceReview, PerformanceReviewBase } from '../types';

const findAll = async (): Promise<PerformanceReview[]> => Object.values(prDB);

const findById = async (id: number): Promise<PerformanceReview> => prDB[id];

const findByEmpId = async (empId: number): Promise<PerformanceReview[]> => {
  return Object.values(prDB).filter(
    (pr: PerformanceReview) => pr.employeeId === empId || pr.reviewerId === empId
  );
};

const findMyPR = async (empId: number): Promise<PerformanceReview[]> => {
  return Object.values(prDB).filter((pr: PerformanceReview) => pr.employeeId === empId);
};

const create = async (newPR: PerformanceReviewBase): Promise<PerformanceReview> => {
  const newId = new Date().valueOf();
  prDB[newId] = {
    id: newId,
    ...newPR,
  };

  return prDB[newId];
};

const update = async (
  id: number,
  prUpdate: PerformanceReviewBase
): Promise<PerformanceReview | null> => {
  const pr = await findById(id);

  if (!pr) {
    return null;
  }

  prDB[id] = { id, ...prUpdate };
  return prDB[id];
};

const remove = async (id: number): Promise<null | void> => {
  const pr = await findById(id);
  if (!pr) {
    return null;
  }

  delete prDB[id];
};

export { findAll, findById, findMyPR, findByEmpId, create, update, remove };
