import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/Users.entity';
import { Connection, getConnection } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(private connection: Connection) {}
  async createMany(users: User[]) {
    const queryRunner = this.connection.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      await queryRunner.manager.save(users[0]);
      await queryRunner.manager.save(users[1]);

      await queryRunner.commitTransaction();
    } catch (err) {
      // since we have errors lets rollback the changes we made
      await queryRunner.rollbackTransaction();
    } finally {
      // you need to release a queryRunner which was manually instantiated
      await queryRunner.release();
    }
  }

  async getAll() {
    const queryRunner = this.connection.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      let data = await queryRunner.manager.find(User);
      console.log(data);

      await queryRunner.commitTransaction();
    } catch (err) {
      // since we have errors lets rollback the changes we made
      await queryRunner.rollbackTransaction();
    } finally {
      // you need to release a queryRunner which was manually instantiated
      await queryRunner.release();
    }
  }
  async insertOne() {
    await getConnection()
      .createQueryBuilder()
      .insert()
      .into(User)
      .values([
        { firstName: 'Timber', lastName: 'Saw', isActive: true },
        { firstName: 'Phantom', lastName: 'Lancer', isActive: true },
        { firstName: 'Timber', lastName: 'Saw', isActive: true },
        { firstName: 'Phantom', lastName: 'Lancer', isActive: true },
        { firstName: 'Timber', lastName: 'Saw', isActive: true },
        { firstName: 'Phantom', lastName: 'Lancer', isActive: true },
        { firstName: 'Timber', lastName: 'Saw', isActive: true },
        { firstName: 'Phantom', lastName: 'Lancer', isActive: true },
      ])
      .execute();
  }
}
