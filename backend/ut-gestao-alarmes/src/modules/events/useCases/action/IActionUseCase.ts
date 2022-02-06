import EventDTO from '../../dtos/EventDTO';
import ContactDTO from '../../dtos/ContactDTO'

export interface Props {
  alarmEvent: EventDTO;
  contact?: ContactDTO;
  contactList?: string[];
}

export default interface IActionUseCase {
  execute({ alarmEvent, contact, contactList }: Props): void;
}