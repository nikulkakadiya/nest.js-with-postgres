import { Injectable } from '@nestjs/common';
import { User } from '../../entities/dbdemo';
import { v1 as uuidv1 } from 'uuid';

@Injectable()
export class UserService {

    getHello(): string {
        return 'this is user Hello World!12';
    }

    async createUser(firstName: string, lastName: string) {
        const userId = uuidv1();
        console.log('userId--',userId);        
        // const user = await User.create({
        //   userId,
        //   firstName,
        //   lastName,        
        // });        
      }
}
