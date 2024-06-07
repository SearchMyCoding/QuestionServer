import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeORMConfig = async (config: ConfigService): Promise<TypeOrmModuleOptions> => {
  return {
    type: 'postgres',
    host: config.get<string>('DATABASE_HOST'),
    port: config.get<number>('DATABASE_PORT'),
    username: config.get<string>('DATABASE_USERNAME'),
    password: config.get<string>('DATABASE_PASSWORD'),
    database: config.get<string>('DATABASE_DATABASE'),
    entities: ['dist/**/*.entity.js'],
    subscribers: ['dist/**/*Subscriber.js'],
    synchronize: false,
    logging: 'all',
    poolSize: 5,
    logNotifications: true,
    keepConnectionAlive: true,
  };
};

export const testTypeORMConfig = async (config: ConfigService): Promise<TypeOrmModuleOptions> => {
  return {
    type: 'postgres',
    host: config.get<string>('TEST_DATABASE_HOST'),
    port: config.get<number>('TEST_DATABASE_PORT'),
    username: config.get<string>('TEST_DATABASE_USERNAME'),
    password: config.get<string>('TEST_DATABASE_PASSWORD'),
    database: config.get<string>('TEST_DATABASE_DATABASE'),
    entities: ['dist/src/entities/*.js'],
    subscribers: ['dist/**/*Subscriber.js'],
    logging: true,
    synchronize: false,
    poolSize: 5,
    logNotifications: true,
    keepConnectionAlive: true,
  };
};
