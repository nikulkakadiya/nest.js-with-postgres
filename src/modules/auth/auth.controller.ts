import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private _authService: AuthService) {}

  @Get()
  @UseGuards(AuthGuard('jwt'))
  async get(@Request() req) {
    // console.log('req--',req.user);
    return this._authService.getHello();
  }

  @Post('login')
  async login(@Body() body) {
    return this._authService.login(body);
  }

  @Post('register')
  async register(@Body() body) {
    return this._authService.register(body);
  }

  @Get('getUserByToken')
  @UseGuards(AuthGuard('jwt'))
  async getUserByToken(@Request() req) {
    return this._authService.getUserByToken(req.user);
  }
}
