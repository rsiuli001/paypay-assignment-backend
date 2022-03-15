import { User } from '.';

type Reactions = 'like' | 'love' | 'dislike';

interface Post {
  id: string;
  createdAt: string; // date string
  lastModifiedAt: string; // date string
  from: User;
  body: string;
  reaction: Reactions;
}

interface PostDb {
  [key: string]: Post;
}

export { Post, Reactions, PostDb };
