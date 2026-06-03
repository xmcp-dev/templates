export type User = {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
};

export type CreateUserInput = {
  name: string;
  email: string;
};
