import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersRepositoryPort } from '../../application/ports/users.repository.port';
import { User } from '../../domain/entities/user';
import { UserMapper } from './user.mapper';
import { UserEntity } from './user.entity';

@Injectable()
export class UsersRepository implements UsersRepositoryPort {
  constructor(
    @InjectRepository(UserEntity)
    private readonly repo: Repository<UserEntity>
  ) {}

  async findByEmail(email: string): Promise<User | null> {
    const row = await this.repo.findOne({ where: { email } });
    return row ? UserMapper.toDomain(row) : null;
  }

  async save(user: User): Promise<number> {
    const row = UserMapper.toOrm(user);
    const newRow = await this.repo.save(row);
    return newRow.id;
  }

  async findByRToken(refreshToken: string): Promise<User | null> {
    const row = await this.repo.findOneBy({ refreshToken });
    return row ? UserMapper.toDomain(row) : null;
  }

  async logout(id: number): Promise<null> {
    const userOrm = await this.repo.findOneBy({ id });
    if (!userOrm) return null;

    userOrm.refreshToken = null;

    await this.repo.update({ id }, userOrm);
    return null;
  }
}
