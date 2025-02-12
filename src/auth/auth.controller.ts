import { Body, Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public, ResponseMessage } from 'src/decorator/customize';
import { LocalAuthGuard } from './local-auth.guard';
import { RegisterUserDto } from 'src/users/dto/create-user.dto';
import { Request, Response } from 'express';

@Controller("auth")
export class AuthController {
  constructor(
    private authService: AuthService
  ) { }

  @ResponseMessage("User Login")
  @Public()
  @UseGuards(LocalAuthGuard)
  @Post("/login")
  handleLogin(
    @Req() req,
    @Res({ passthrough: true }) response: Response
  ) {
    return this.authService.login(req.user, response);
  }

  @ResponseMessage("Register a new user")
  @Public()
  @Post('/register')
  getProfile1(@Body() registerUserDto: RegisterUserDto) {
    return this.authService.register(registerUserDto);
  }
}
