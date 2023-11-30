import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { FirebaseAppService } from '../firebase-app/firebase-app.service';
import CreateUserDto from '../../dtos/createUser.dto';
import UserEntity from '../../Entities/user.entity';
import updateUserDto from '../../dtos/updateUser.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private firebaseApp: FirebaseAppService,
    private dataSource: DataSource,
  ) {}

  public async getAllUsers() {
    return await this.userRepository.find();
  }

  public async getUserTransactions(id: string) {
    const user = await this.userRepository.findOneBy({ id });
    return user.transactions;
  }
  public async createUser(userdetails: CreateUserDto): Promise<any> {
    try {
      const firebaseUser = await this.firebaseApp.getAuth().createUser({
        disabled: false,
        displayName: userdetails.displayName,
        email: userdetails.email,
        emailVerified: false,
        password: userdetails.password,
        phoneNumber: userdetails.phoneNumber,
      });
      const userEntity: UserEntity = {
        name: firebaseUser.displayName,
        email: firebaseUser.email,
        phoneNumber: firebaseUser.phoneNumber,
        uid: firebaseUser.uid,
      };
      return await this.userRepository.save(userEntity);
    } catch (e) {
      throw new HttpException(e, HttpStatus.BAD_REQUEST);
    }
  }

  public async updateUserDetails(
    userDetails: updateUserDto,
    userId: string,
  ): Promise<any> {
    try {
      const user: any = {
        name: userDetails.displayName,
        phoneNumber: userDetails.phoneNumber,
      };
      await this.userRepository.update(userId, user);
      const updatedUser = await this.userRepository.findOneBy({ id: userId });
      await this.firebaseApp.getAuth().updateUser(updatedUser.uid, {
        displayName: userDetails.displayName,
        phoneNumber: userDetails.phoneNumber,
      });
      return updatedUser;
    } catch (e) {
      throw new HttpException(e, HttpStatus.BAD_REQUEST);
    }
  }

  public getCurrentUser(accessToken: string) {
    return this.firebaseApp.getAuth().verifyIdToken(accessToken);
  }
}
