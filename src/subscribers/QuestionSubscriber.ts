import { Question } from 'src/question/question.entity';
import { EventSubscriber, EntitySubscriberInterface, InsertEvent } from 'typeorm';

@EventSubscriber()
export class QuestionSubscriber implements EntitySubscriberInterface {
  // eslint-disable @typescript-eslint/ban-types
  listenTo() {
    return Question;
  }

  beforeInsert(event: InsertEvent<Question>) {
    const { entity } = event;

    entity.answer = [];
  }
}
