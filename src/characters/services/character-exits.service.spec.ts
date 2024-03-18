import { Test, TestingModule } from '@nestjs/testing';
import { CharacterExitsService } from './character-exits.service';

describe('CharacterExitsService', () => {
  let service: CharacterExitsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CharacterExitsService],
    }).compile();

    service = module.get<CharacterExitsService>(CharacterExitsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
