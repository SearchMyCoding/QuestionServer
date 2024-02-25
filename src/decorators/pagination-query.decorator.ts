import { ExecutionContext, createParamDecorator } from "@nestjs/common";
import { Request } from "express";
import { PAGINATION_DEFAULT_VALUE, PAGINATION_TYPE } from "src/constants/pagination.constant";
import { RequestPaginationDto } from "src/dto/RequestPagination.dto";

export const PaginationQuery = createParamDecorator<Partial<PAGINATION_TYPE>, ExecutionContext, RequestPaginationDto>(
  (data: Partial<PAGINATION_TYPE>, ctx: ExecutionContext): RequestPaginationDto => {
    const request: Request = ctx.switchToHttp().getRequest();
    const { skip, limit, sort, afterBy } = request.query as { skip: string, limit: string, sort: string, afterBy: string };

    const parseSkip: number = parseInt(skip, 10);
    const parseLimit: number = parseInt(limit, 10);
    const parseAfterBy: number = parseInt(afterBy, 10);

    const result: RequestPaginationDto = {
      skip: (!!skip && !isNaN(parseSkip)) ? parseSkip : PAGINATION_DEFAULT_VALUE.skip ,
      limit: (!!limit && !isNaN(parseLimit) && parseLimit > 0) ? parseLimit : PAGINATION_DEFAULT_VALUE.limit,
      sort: sort !== "DESC" ? PAGINATION_DEFAULT_VALUE.sort : sort,
      afterBy: (!!afterBy && !isNaN(parseAfterBy) && parseAfterBy > 0) ? parseAfterBy : PAGINATION_DEFAULT_VALUE.afterBy
    }
    return result;
  }
)