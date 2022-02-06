import { LevelRepository } from '../../modules/events/infra/database/repositories/LevelRepository';
import { CategoryRepository } from '../../modules/events/infra/database/repositories/CategoryRepository';
import { EventRepository } from '../../modules/events/infra/database/repositories/EventRepository';
import { OriginRepository } from '../../modules/events/infra/database/repositories/OriginRepository';
import { DescriptionRepository } from '../../modules/events/infra/database/repositories/DescriptionRepository';
import CreateEventUseCase from '../../modules/events/useCases/event/CreateEventUseCase';
import EventRequestDTO from '../../modules/events/dtos/EventRequestDTO';
import Pino from './Pino';

export default async function createEvent(event: EventRequestDTO) {
  const levelRepository = new LevelRepository();
  const categoryRepository = new CategoryRepository();
  const eventRepository = new EventRepository();
  const originRepository = new OriginRepository();
  const descriptionRepository = new DescriptionRepository();

  try {
    const createEventUseCase = new CreateEventUseCase(eventRepository, levelRepository, categoryRepository, originRepository, descriptionRepository);
    const eventCreated = await createEventUseCase.execute({ eventFromRequest: event });

    return eventCreated;
  } catch (err) {
    Pino.error(err);
  }
}