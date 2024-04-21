import { CallHandler, ExecutionContext, Injectable, Logger, NestInterceptor } from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';

@Injectable()
export class LoggerInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request: Request = context.switchToHttp().getRequest();
    const { method, hostname, path, params, body } = request;

    Logger.log(`[${method}] host: ${hostname}, path: ${path}, params: ${JSON.stringify(params)}, data: ${JSON.stringify(body)}`);

    return next.handle();
  }
}
