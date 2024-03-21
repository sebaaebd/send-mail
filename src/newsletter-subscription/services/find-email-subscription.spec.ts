import { Test, TestingModule } from '@nestjs/testing';
import { FindEmailSubscriptionService } from './find-email-subscription';

describe('NewsletterSubscriptionService', () => {
  let service: FindEmailSubscriptionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FindEmailSubscriptionService],
    }).compile();

    service = module.get<FindEmailSubscriptionService>(
      FindEmailSubscriptionService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
