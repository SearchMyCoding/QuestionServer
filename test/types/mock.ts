import { ExtendedBaseTimeEntity } from '@exnest/extended-nest';
import { EntityManager, Repository } from 'typeorm';

export type MockRepository<T extends ExtendedBaseTimeEntity> = Partial<Record<keyof Repository<T>, jest.Mock>>;
export interface MockQueryRunner {
  readonly manager: EntityManager;
}
