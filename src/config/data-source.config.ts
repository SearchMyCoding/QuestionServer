import { ConfigService } from '@nestjs/config';
import 'dotenv/config';
import { Answer } from 'src/entities/answer.entity';
import { Question } from 'src/entities/question.entity';
import { DataSource } from 'typeorm';

const config: ConfigService = new ConfigService();

export default new DataSource({
  type: 'postgres',
  host: config.get<string>('DATABASE_HOST'),
  port: config.get<number>('DATABASE_PORT'),
  username: config.get<string>('DATABASE_USERNAME'),
  password: config.get<string>('DATABASE_PASSWORD'),
  database: config.get<string>('DATABASE_DATABASE'),
  entities: [Question, Answer],
  synchronize : false,
  migrations: ['src/database/migrations/*.ts'],
});