import { Test, TestingModule } from '@nestjs/testing';
import { VehiclesController } from './vehicles.controller';
import { VehiclesService } from './vehicles.service';

describe('AppController', () => {
  let vehicleController: VehiclesController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [VehiclesController],
      providers: [VehiclesController],
    }).compile();

    vehicleController = app.get<VehiclesController>(VehiclesController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(vehicleController.getHello({})).toBe('Hello World!');
    });
  });
});
