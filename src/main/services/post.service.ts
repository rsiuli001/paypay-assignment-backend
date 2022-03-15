import { PostDB } from '../../constants/PostDB';
import { Post } from '../types';

const findAll = async (): Promise<Post[]> => Object.values(PostDB);

const findById = async (id: string): Promise<Post> => PostDB[id];

const findByUser = async (userId: string): Promise<Post[]> =>
  Object.values(PostDB).filter((post) => post.from.email === userId);

// create
const create = async (newPost: Post): Promise<Post> => {
  PostDB[newPost.id] = newPost;
  return PostDB[newPost.id];
};

const update = async (id: string, postUpdate: Post): Promise<Post | null> => {
  const user = await findById(id);
  if (!user) {
    return null;
  }

  PostDB[id] = { ...postUpdate };
  return PostDB[id];
};

const remove = async (id: string): Promise<null | void> => {
  const user = await findById(id);
  if (!user) {
    return null;
  }

  delete PostDB[id];
};

export { findAll, findById, findByUser, create, update, remove };
