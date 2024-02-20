import { IsInt, IsOptional, IsPositive } from "class-validator";
import { PAGINATION_DEFAULT_VALUE } from "src/constants/pagination.constant";

export class RequestPaginationDto {
  @IsInt()
  @IsOptional()
  skip? : number = PAGINATION_DEFAULT_VALUE.skip;

  @IsPositive()
  @IsInt()
  @IsOptional()
  limit?: number = PAGINATION_DEFAULT_VALUE.limit;
}