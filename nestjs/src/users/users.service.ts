import { Injectable } from "@nestjs/common";
import { CreateUserInput } from "./user";
import { getUsersStore } from "./users.store";

@Injectable()
export class UsersService {
  private readonly usersStore = getUsersStore();

  create(input: CreateUserInput) {
    return this.usersStore.create(input);
  }

  findAll() {
    return this.usersStore.findAll();
  }
}
