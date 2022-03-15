import { PostDb } from '../main/types';

var PostDB: PostDb = {
  1: {
    body: 'Test body',
    id: '1',
    createdAt: 'aaaa',
    lastModifiedAt: 'aaaa',
    from: {
      email: 'test@test.com',
      name: 'Test Name',
      id: 1,
      prId: '1',
      role: '',
    },
    reaction: 'like',
  },
};

export { PostDB };
