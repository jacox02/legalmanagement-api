import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getServerAvaliablity(): string {
    return 'The API is working';
  }
}
