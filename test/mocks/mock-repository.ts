import { mockQueryRunner } from 'test/mocks/mock-query-runner';

export const mockRepository = () => ({
  create: jest.fn(),
  manager: {
    connection: {
      createQueryRunner: jest.fn().mockReturnValue(mockQueryRunner()),
    },
  },
});
