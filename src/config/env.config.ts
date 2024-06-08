import { ConfigModuleOptions } from '@nestjs/config';
import Joi from 'joi';

const validationSchema = Joi.object({
  DATABASE_HOST: Joi.string().required(),
  DATABASE_PORT: Joi.number().required(),
  DATABASE_USERNAME: Joi.string().required(),
  DATABASE_PASSWORD: Joi.string().required(),
  DATABASE_DATABASE: Joi.string().required(),
  SERVER_PORT: Joi.number().default(3000),
  SWAGGER_PATH: Joi.string().default('api'),
  SALT: Joi.string().required(),
  HASH_ALGORITHM: Joi.string().required(),
  TEST_DATABASE_HOST: Joi.string().default('localhost'),
  TEST_DATABASE_PORT: Joi.number().default(5432),
  TEST_DATABASE_USERNAME: Joi.string().default('postgres'),
  TEST_DATABASE_PASSWORD: Joi.number().default(1234),
  TEST_DATABASE_DATABASE: Joi.string().default('test'),
})
  .unknown()
  .required();

export const envConfig: ConfigModuleOptions = {
  isGlobal: true,
  validationSchema,
  expandVariables: true,
};
