import { Test, TestingModule } from '@nestjs/testing';
import { Service1Service } from './service1.service';

describe('Service1Service', () => {
  let service: Service1Service;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Service1Service],
    }).compile();

    service = module.get<Service1Service>(Service1Service);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
