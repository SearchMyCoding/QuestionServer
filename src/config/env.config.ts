import { ConfigModuleOptions } from '@nestjs/config';
import { number, object, string } from 'joi';

const validationSchema = object({
  DATABASE_HOST: string().required(),
  DATABASE_PORT: number().required(),
  DATABASE_USERNAME: string().required(),
  DATABASE_PASSWORD: string().required(),
  DATABASE_DATABASE: string().required(),
  SERVER_PORT: number().default(3000),
  SWAGGER_PATH: string().default('api'),
  SALT: string().required(),
  HASH_ALGORITHM: string().required(),
  TEST_DATABASE_HOST: string().default('localhost'),
  TEST_DATABASE_PORT: number().default(5432),
  TEST_DATABASE_USERNAME: string().default('postgres'),
  TEST_DATABASE_PASSWORD: number().default(1234),
  TEST_DATABASE_DATABASE: string().default('test'),
})
  .unknown()
  .required();

export const envConfig: ConfigModuleOptions = {
  isGlobal: true,
  validationSchema,
  expandVariables: true,
};
