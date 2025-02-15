import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ResponseMessage, User } from 'src/decorator/customize';
import { IUser } from './users.interface';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @ResponseMessage("Create a new user")
  @Post()
  create(
    @Body() createUserDto: CreateUserDto,
    @User() user: IUser
  ) {
    // const myEmail: string = req.body.email
    return this.usersService.create(createUserDto, user);
  }

  @Get()
  findAll(
    @Query("current") currentPage: string,
    @Query("pageSize") limit: string,
    @Query() qs: string,
  ) {
    return this.usersService.findAll(+currentPage, +limit, qs);
  }

  @ResponseMessage('Fetched Stats Succesfully')
  @Get(':hoidanit')
  findOne(@Param('hoidanit') id: string) {
    return this.usersService.findOne(id); //+id = string => number
  }

  @ResponseMessage('Update a User')
  @Patch()
  update(
    @Body() updateUserDto: UpdateUserDto,
    @User() user: IUser
  ) {
    return this.usersService.update(updateUserDto, user);
  }

  @ResponseMessage('Delete a User')
  @Delete(':id')
  remove(
    @Param('id') id: string,
    @User() user: IUser
  ) {
    return this.usersService.remove(id, user);
  }
}
