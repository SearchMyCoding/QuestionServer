import { ORDER_BY_TYPE } from "src/constants/pagination.constant";

export interface IPagination {
  skip?: number;
  limit?: number;
  sort?: { field: string, by: ORDER_BY_TYPE }[];
  search?: { field: string, value: string }[];
}