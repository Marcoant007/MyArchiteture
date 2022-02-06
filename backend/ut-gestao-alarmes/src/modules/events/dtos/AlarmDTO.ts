import Alarm from '../infra/database/models/Alarm';
import EventDTO from './EventDTO';

export default class AlarmDTO {
  id?: number;
  createdAt: Date;
  whoSawItId?: number;
  whoCheckedItId?: number;
  event: EventDTO;

  constructor(alarm: Alarm) {
    this.id = alarm.id;
    this.createdAt = alarm.createdAt;
    this.whoSawItId = alarm.whoSawItId;
    this.whoCheckedItId = alarm.whoCheckedItId;
    this.event = new EventDTO(alarm.event);
  }
}