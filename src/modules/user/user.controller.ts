import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from 'src/entities/dbdemo';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}
    @Get()
    getHello(): string {
      return this.userService.getHello();
    }

    @Post()
    async createUser(
        @Body('firstName') firstName: string,
        @Body('lastName') lastName: string,
    ){
        console.log(firstName,' = ',lastName);
        
        return this.userService.createUser(firstName, lastName);
    }
}
