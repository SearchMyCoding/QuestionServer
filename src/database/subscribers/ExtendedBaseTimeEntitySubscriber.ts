import { ExtendedBaseTimeEntity } from "@exnest/extended-nest"
import { LocalDateTime } from "@js-joda/core";
import { EventSubscriber, EntitySubscriberInterface, UpdateEvent } from "typeorm"

@EventSubscriber()
export class ExtendedBaseTimeEntitySubscriber implements EntitySubscriberInterface {
  listenTo(): Function {
    return ExtendedBaseTimeEntity;
  }

  beforeUpdate(event: UpdateEvent<ExtendedBaseTimeEntity>): void | Promise<any> {
    const { entity } = event;
    const now: LocalDateTime = LocalDateTime.now();

    entity.updatedAt = now;
  }
}
