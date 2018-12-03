import { User } from '../entities/user.entity';
import { UpdateUserDto } from '../dto/update.user.dto';
import { Controller, Post, Get, Delete, Param, Body, HttpStatus, Res, Query } from '@nestjs/common';
import { CreateUserDto } from '../dto/create.user.dto';
import { UsersService } from '../services/users.service';
import { Response } from 'express';

@Controller('users')
export class UsersController {
  public constructor(
    private readonly _usersService: UsersService,
  ) { }

  @Get()
  public async findAll(
    @Res() res: Response,
    @Query() queryParams: { page: number, limit: number, order: string, sort: string },
  ) {
    try {
      const users: User[] = await this._usersService.findAll(queryParams);
      return res.status(HttpStatus.OK).json({ data: users, error: null });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({ data: null, error });
    }
  }

  @Post()
  public async create(@Res() res: Response, @Body() command: CreateUserDto) {
    try {
      const newUser: User = await this._usersService.create(command);
      return res.status(HttpStatus.OK).json({ data: newUser, error: null });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({ data: null, error });
    }
  }

  @Get(':id')
  public async findOne(@Res() res: Response, @Param('id') id: number) {
    try {
      const user: User = await this._usersService.findOne(id);
      return res.status(HttpStatus.OK).json({ data: user, error: null });
    } catch (error) {
      return res.status(HttpStatus.UNAUTHORIZED).json({ data: null, error });
    }
  }

  @Get(':id')
  public async updateOne(@Res() res: Response, @Param('id') id: number, @Body() command: UpdateUserDto) {
    try {
      const newUser: User = await this._usersService.updateOne(id, command);
      return res.status(HttpStatus.OK).json({ data: newUser, error: null });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({ data: null, error });
    }
  }

  @Delete(':id')
  public async deleteOne(@Res() res: Response, @Param('id') id: number) {
    try {
      await this._usersService.deleteOne(id);
      return res.status(HttpStatus.OK).json({ data: 'Ok', error: null });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({ data: null, error });
    }
  }
}