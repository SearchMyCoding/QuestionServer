import { ApiProperty, PartialType } from "@nestjs/swagger";
import { IsInt, IsOptional, IsPositive, IsString } from "class-validator";
import { ORDER_BY_TYPE } from "src/constants/pagination.constant";

export class RequestPaginationDto {
  @ApiProperty({
    required: false,
    type: Number
  })
  @IsInt()
  @IsOptional()
  skip?: number;

  @ApiProperty({
    required: false,
    type: Number
  })
  @IsPositive()
  @IsInt()
  @IsOptional()
  limit?: number;

  @ApiProperty({
    required: false
  })
  @IsString()
  @IsOptional()
  sort?: ORDER_BY_TYPE
}