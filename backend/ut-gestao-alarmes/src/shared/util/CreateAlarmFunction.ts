import { AlarmRepository } from '../../modules/events/infra/database/repositories/AlarmRepository'
import { LevelRepository } from '../../modules/events/infra/database/repositories/LevelRepository';
import { CategoryRepository } from '../../modules/events/infra/database/repositories/CategoryRepository';
import { EventRepository } from '../../modules/events/infra/database/repositories/EventRepository';
import { OriginRepository } from '../../modules/events/infra/database/repositories/OriginRepository';
import { DescriptionRepository } from '../../modules/events/infra/database/repositories/DescriptionRepository';
import { ContactRepository } from '../../modules/events/infra/database/repositories/ContactRepository';
import { ContactHasActionRepository } from '../../modules/events/infra/database/repositories/ContactHasActionRepository';
import CreateAlarmUseCase from '../../modules/events/useCases/alarm/CreateAlarmUseCase';
import AlarmRequestDTO from '../../modules/events/dtos/AlarmRequestDTO';
import Pino from './Pino';

export default async function createAlarm(alarm: AlarmRequestDTO) {
  const alarmRepository = new AlarmRepository();
  const levelRepository = new LevelRepository();
  const categoryRepository = new CategoryRepository();
  const eventRepository = new EventRepository();
  const originRepository = new OriginRepository();
  const descriptionRepository = new DescriptionRepository();
  const contactRepository = new ContactRepository();
  const contactHasActionRepository = new ContactHasActionRepository();

  try {
    const createAlarmUseCase = new CreateAlarmUseCase(
      alarmRepository, eventRepository, levelRepository, categoryRepository, originRepository, descriptionRepository, contactRepository, contactHasActionRepository
    );
    const alarmCreated = await createAlarmUseCase.execute({ alarmFromRequest: alarm });

    return alarmCreated;
  } catch (err) {
    Pino.error(err);
  }
}