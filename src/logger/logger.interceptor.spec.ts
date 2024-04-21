import { contextStub } from 'test/stubs/context.stub';
import { LoggerInterceptor } from 'src/logger/logger.interceptor';
import { ExecutionContext, Logger } from "@nestjs/common";

const mockContext = jest.fn().mockReturnValue({
  switchToHttp: jest.fn().mockReturnValue({
    getRequest: jest.fn().mockReturnValue(contextStub())
  })
});

const mockNextFn = jest.fn().mockReturnValue({
  handle: jest.fn()
});

describe('LoggerInterceptor', () => {
  let loggerInterceptor: LoggerInterceptor;
  let context: ExecutionContext;

  beforeAll(() => {
    loggerInterceptor = new LoggerInterceptor();
    context = mockContext();
  });

  it('should be defined', () => { 
    expect(loggerInterceptor).toBeDefined();
  });

  it('should be logged', () => {
    const { method, hostname, path, params, body } = context.switchToHttp().getRequest();
    const spyOnLogger = jest.spyOn(Logger, 'log');
    loggerInterceptor.intercept(context, mockNextFn());
    expect(spyOnLogger.mock.calls).toContainEqual([`[${method}] host: ${hostname}, path: ${path}, params: ${JSON.stringify(params)}, data: ${JSON.stringify(body)}`]);
  });
});
