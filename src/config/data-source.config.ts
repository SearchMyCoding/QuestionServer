import { ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';
import 'dotenv/config';

const config: ConfigService = new ConfigService();

export default new DataSource({
  type: 'postgres',
  host: config.get<string>('DATABASE_HOST'),
  port: config.get<number>('DATABASE_PORT'),
  username: config.get<string>('DATABASE_USERNAME'),
  password: config.get<string>('DATABASE_PASSWORD'),
  database: config.get<string>('DATABASE_DATABASE'),
  synchronize: false,
  migrations: ['src/database/migrations/*.ts'],
});
