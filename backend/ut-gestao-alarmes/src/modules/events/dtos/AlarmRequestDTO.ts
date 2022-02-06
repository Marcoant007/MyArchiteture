import EventRequestDTO from './EventRequestDTO';

export default class AlarmRequestDTO {
  whoSawItId?: number;
  whoCheckedItId?: number;
  event: EventRequestDTO;
}