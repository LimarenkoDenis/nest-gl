import { CreateUserDto } from './../dto/create.user.dto';
import { User } from './../entities/user.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateUserDto } from '../dto/update.user.dto';

@Injectable()
export class UsersService {
  private _users: User[] = [];

  public async findAll(query: any): Promise<User[]> {
    return Promise.resolve(this._users);
  }

  public async create(command: CreateUserDto): Promise<User> {
    const newUser: User = { ...command, id: this._users.length };
    this._users.push(newUser);
    return Promise.resolve(newUser);
  }

  public async findOne(id: number): Promise<User> {
    const user: User | undefined = this._users.find((item: User) => item.id === id);
    if (!user) {
      throw new NotFoundException('Can not find user by id');
    }
    return Promise.resolve(user);
  }

  public async updateOne(id: number, command: UpdateUserDto): Promise<User> {
    const index: number = this._users.findIndex((item: User) => item.id === id);
    if (index === -1) {
      throw new NotFoundException('Can not find user by id');
    }
    const updatedUser: User = { ...this._users[index], ...command };
    this._users.splice(index, 1, updatedUser);
    return Promise.resolve(updatedUser);
  }

  public async deleteOne(id: number): Promise<{ id: number }> {
    const index: number = this._users.findIndex((item: User) => item.id === id);
    if (index === -1) {
      throw new NotFoundException('Can not find user by id');
    }
    this._users.splice(index, 1);
    return Promise.resolve({ id: index });
  }
}