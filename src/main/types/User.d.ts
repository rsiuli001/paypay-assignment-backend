interface User extends UserBase {
  id: number;
}

interface Users {
  [key: number]: User;
}

interface UserBase {
  name: string;
  email: string;
  role: string;
  prId: string;
}

export { UserBase, Users, User };
