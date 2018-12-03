import { User } from '../entities/user.entity';
import { UpdateUserDto } from '../dto/update.user.dto';
import { Controller, Post, Get, Delete, Param, Body, HttpStatus, Res, Query, Put } from '@nestjs/common';
import { CreateUserDto } from '../dto/create.user.dto';
import { UsersService } from '../services/users.service';
import { Response } from 'express';
import { ApiUseTags, ApiOperation, ApiResponse, ApiImplicitQuery } from '@nestjs/swagger';

@ApiUseTags('users')
@Controller('users')
export class UsersController {
  public constructor(
    private readonly _usersService: UsersService,
  ) { }

  @Get()
  @ApiOperation({ title: 'Get list of users'})
  @ApiResponse({ status: HttpStatus.OK, description: 'return list of users' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad request' })
  @ApiImplicitQuery({ name: 'order', enum: ['abc', 'cba'] }  )
  @ApiImplicitQuery({ name: 'page' }  )
  @ApiImplicitQuery({ name: 'limit' }  )
  @ApiImplicitQuery({ name: 'sort' }  )
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
  @ApiOperation({ title: 'Create new user'})
  @ApiResponse({ status: HttpStatus.OK, description: 'return new created user' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad request' })
  public async create(@Res() res: Response, @Body() command: CreateUserDto) {
    try {
      const newUser: User = await this._usersService.create(command);
      return res.status(HttpStatus.OK).json({ data: newUser, error: null });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({ data: null, error });
    }
  }

  @Get(':id')
  @ApiOperation({ title: 'Find user'})
  @ApiResponse({ status: HttpStatus.OK, description: 'return user' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad request' })
  public async findOne(@Res() res: Response, @Param('id') id: number) {
    try {
      const user: User = await this._usersService.findOne(id);
      return res.status(HttpStatus.OK).json({ data: user, error: null });
    } catch (error) {
      return res.status(HttpStatus.UNAUTHORIZED).json({ data: null, error });
    }
  }

  @Put(':id')
  @ApiOperation({ title: 'Update user'})
  @ApiResponse({ status: HttpStatus.OK, description: 'return updated user' })
  public async updateOne(@Res() res: Response, @Param('id') id: number, @Body() command: UpdateUserDto) {
    try {
      const newUser: User = await this._usersService.updateOne(id, command);
      return res.status(HttpStatus.OK).json({ data: newUser, error: null });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({ data: null, error });
    }
  }

  @Delete(':id')
  @ApiOperation({ title: 'Delete user'})
  @ApiResponse({ status: HttpStatus.OK, description: 'return ok' })
  public async deleteOne(@Res() res: Response, @Param('id') id: number) {
    try {
      await this._usersService.deleteOne(id);
      return res.status(HttpStatus.OK).json({ data: 'Ok', error: null });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({ data: null, error });
    }
  }
}