import { randomUUID } from "node:crypto";
import { CreateUserInput, User } from "./user";

export class UsersStore {
  private readonly users = new Map<string, User>();

  constructor() {
    this.create({ name: "Ada Lovelace", email: "ada@example.com" });
    this.create({ name: "Grace Hopper", email: "grace@example.com" });
  }

  create(input: CreateUserInput): User {
    const user = {
      id: randomUUID(),
      ...input,
      createdAt: new Date(),
    };

    this.users.set(user.id, user);
    return user;
  }

  findAll(): User[] {
    return Array.from(this.users.values());
  }
}

let usersStore: UsersStore | undefined;

export function getUsersStore(): UsersStore {
  usersStore ??= new UsersStore();
  return usersStore;
}
