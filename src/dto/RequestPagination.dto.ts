import { IsInt, IsOptional, IsPositive, IsString } from "class-validator";
import { ORDER_BY_TYPE } from "src/constants/pagination.constant";

export class RequestPaginationDto {
  @IsInt()
  @IsOptional()
  skip? : number;

  @IsPositive()
  @IsInt()
  @IsOptional()
  limit?: number;

  @IsString()
  @IsOptional()
  sort?: ORDER_BY_TYPE
}