import { Test, TestingModule } from '@nestjs/testing';
import { FirebaseAppService } from './firebase-app.service';

describe('FirebaseAppService', () => {
  let service: FirebaseAppService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FirebaseAppService],
    }).compile();

    service = module.get<FirebaseAppService>(FirebaseAppService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
