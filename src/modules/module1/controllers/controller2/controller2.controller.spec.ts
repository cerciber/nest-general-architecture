import { Test, TestingModule } from '@nestjs/testing';
import { Controller2Controller } from './controller2.controller';

describe('Controller2Controller', () => {
  let controller: Controller2Controller;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [Controller2Controller],
    }).compile();

    controller = module.get<Controller2Controller>(Controller2Controller);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
