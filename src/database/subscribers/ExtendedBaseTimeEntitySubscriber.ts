import { ExtendedBaseTimeEntity } from '@exnest/extended-nest'
import { LocalDateTime } from '@js-joda/core'
import { EventSubscriber, EntitySubscriberInterface, UpdateEvent } from 'typeorm'

@EventSubscriber()
export class ExtendedBaseTimeEntitySubscriber implements EntitySubscriberInterface {
  // eslint-disable @typescript-eslint/ban-types
  listenTo() {
    return ExtendedBaseTimeEntity
  }

  // eslint-disable @typescript-eslint/ban-types
  beforeUpdate(event: UpdateEvent<ExtendedBaseTimeEntity>) {
    const { entity } = event
    const now: LocalDateTime = LocalDateTime.now()

    entity.updatedAt = now
  }
}
