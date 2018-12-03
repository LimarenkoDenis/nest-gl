import { UpdateUserDto } from './../dto/update.user.dto';
import { Controller, Post, Get, Delete, Param, Body, HttpStatus, Res, Query, Put, UsePipes } from '@nestjs/common';
import { CreateUserDto } from '../dto/create.user.dto';
import { UsersService } from '../services/users.service';
import { ApiUseTags, ApiOperation, ApiResponse, ApiImplicitQuery } from '@nestjs/swagger';
import { SanitizePipe } from '../../pipes/sanitize.pipe';
import { ValidationPipe } from '../../pipes/validation.pipe';

@ApiUseTags('users')
@Controller('users')
export class UsersController {
  public constructor(
    private readonly _usersService: UsersService,
  ) { }

  @Get()
  @ApiOperation({ title: 'Get list of users' })
  @ApiResponse({ status: HttpStatus.OK, description: 'return list of users' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad request' })
  @ApiImplicitQuery({ name: 'order', enum: ['abc', 'cba'] })
  @ApiImplicitQuery({ name: 'page' })
  @ApiImplicitQuery({ name: 'limit' })
  @ApiImplicitQuery({ name: 'sort' })
  public async findAll(
    @Query() queryParams: { page: number, limit: number, order: string, sort: string },
  ) {
    return await this._usersService.findAll(queryParams);
  }

  @Post()
  @ApiOperation({ title: 'Create new user' })
  @ApiResponse({ status: HttpStatus.OK, description: 'return new created user' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad request' })
  @UsePipes(ValidationPipe, SanitizePipe)
  public async create(
    @Body() command: CreateUserDto,
  ) {
    return await this._usersService.create(command);
  }

  @Get(':id')
  @ApiOperation({ title: 'Find user' })
  @ApiResponse({ status: HttpStatus.OK, description: 'return user' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad request' })
  public async findOne(@Param('id') id: number) {
    return await this._usersService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ title: 'Update user' })
  @ApiResponse({ status: HttpStatus.OK, description: 'return updated user' })
  @UsePipes(ValidationPipe, SanitizePipe)
  public async updateOne(
    @Param('id') id: number,
    @Body() command: UpdateUserDto,
  ) {
    return await this._usersService.updateOne(id, command);
  }

  @Delete(':id')
  @ApiOperation({ title: 'Delete user' })
  @ApiResponse({ status: HttpStatus.OK, description: 'return ok' })
  public async deleteOne(@Param('id') id: number) {
    return await this._usersService.deleteOne(id);
  }
}