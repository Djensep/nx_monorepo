import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../domain/entities/users.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(UserEntity) private userRepo: Repository<UserEntity>
  ) {}

  async registerUser() {}

  async loginUser() {}

  async refreshToken() {}

  async logoutUser() {}
}
