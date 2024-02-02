import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';


@Controller('auth')
export class AuthController {
    constructor(private _authService: AuthService){

    }

    @Post('login')
    async login(@Body() body){       
        return this._authService.login(body);
    }

    @Post('register')
    async register(@Body() body){       
        return this._authService.register(body);
    }
    
    @Get()
    @UseGuards(AuthGuard('jwt'))
    async get(@Request() req){    
        // console.log('req--',req.user);             
        return this._authService.getHello();
    }
}
