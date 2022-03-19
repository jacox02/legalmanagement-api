import { Injectable } from '@nestjs/common';
import { join } from 'path';

@Injectable()
export class AppService {
  constructor() {}

  async data(): Promise<any> {
    console.log({
      static: join(__dirname, '..', 'client/src/images/'),
      envFile: `${process.cwd()}/config/env/${process.env.NODE_ENV}.env`,
      test: process.env.JWT_SECRET,
    });

    return 'a';
  }
}
