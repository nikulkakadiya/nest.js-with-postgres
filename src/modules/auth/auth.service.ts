import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { User } from '../../entities/dbdemo';
import { v1 as uuidv1 } from 'uuid';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UserService))
    private readonly _userService: UserService,
    private readonly _jwtService: JwtService,
  ) {}

  async login(payload: any) {
    console.log('payload-----',payload);
    
    return await this.validateUser(payload.email, payload.password);
  }

  async validateUser(email: string, pass: string) {
    try {
      const findUser = await User.findOne({
        where: { email },
        attributes: ['userId', 'email', 'name', 'password'],
      });

      if (!findUser) {
        return { status: 'error', message: 'User not found! please try again' };
      }
      const match = await this.comparePassword(pass, findUser.password);

      if (!match) {
        return { status: 'error', message: 'Invalid credentials' };
      }

      const token = await this.generateToken({
        id: findUser.userId,
        email: findUser.email,
      });
      const { password, ...result } = findUser['dataValues'];

      return {
        status: 'success',
        message: 'Login success fully',
        token: token,
        user: result,
      };
    } catch (error) {
      console.log(error);
      return { status: 'error', message: 'Some thing wrong' };
    }
  }

  private async comparePassword(enteredPassword, dbPassword) {
    const match = await bcrypt.compare(enteredPassword, dbPassword);
    return match;
  }

  async generateToken(user) {
    const token = await this._jwtService.signAsync(user);
    return token;
  }

  async register(payload: any) {
    try {
      const findEmail = await User.findOne({ where: { email: payload.email } });
      if (findEmail) {
        return {
          message:
            'This email address is already in our system, please use other.',
        };
      }
      const newPassword = await bcrypt.hash(payload.password, 10);

      const user = await User.create({
        userId: uuidv1(),
        name: payload.name,
        email: payload.email,
        password: newPassword,
      });
      const data = {
        userId: user.userId,
        email: user.email,
      };
      const token = await this._jwtService.signAsync(data);
      return {
        status: 'success',
        user,
        token,
        message: 'User Created Successfully',
      };
    } catch (error) {
      console.log(error);
      return { status: 'error', message: 'Some thing wrong' };
    }
  }

  getHello(): string {
    return 'this is secure router';
  }

  getUserByToken(user){
    try{
        return {
          status: 'success',
          user,
        };
    }catch(error){
        console.log('error',error);
        return { status: 'error', message: 'Some thing wrong' };
    }
  }
}
