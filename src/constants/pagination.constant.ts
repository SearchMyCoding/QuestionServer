const PAGINATION = {
  DEFAULT: "DEFAULT",
  SEARCH: "SEARCH"
} as const;

const PAGINATION_DEFAULT_VALUE = {
  skip: 0,
  limit: 10,
} as const;

const ORDER_BY = {
  ASC: "ASC",
  DESC: "DESC"
} as const;

type PAGINATION_TYPE = typeof PAGINATION[keyof typeof PAGINATION];
type ORDER_BY_TYPE = typeof ORDER_BY[keyof typeof ORDER_BY];

export {
  PAGINATION,
  PAGINATION_DEFAULT_VALUE,
  ORDER_BY,
  PAGINATION_TYPE,
  ORDER_BY_TYPE
}