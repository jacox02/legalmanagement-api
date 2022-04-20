import { Injectable } from '@nestjs/common';
import { join } from 'path';

@Injectable()
export class AppService {
  constructor() {}

  async data(): Promise<any> {
    return 'a';
  }
}
