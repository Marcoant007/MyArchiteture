import IAlarmRepository from '../../repositories/IAlarmRepository';
import IEventRepository from '../../repositories/IEventRepository';
import ILevelRepository from '../../repositories/ILevelRepository';
import ICategoryRepository from '../../repositories/ICategoryRepository';
import IOriginRepository from '../../repositories/IOriginRepository';
import IDescriptionRepository from '../../repositories/IDescriptionRepository';
import IContactRepository from '../../repositories/IContactRepository'
import IContactHasActionRepository from '../../repositories/IContactHasActionRepository';
import AlarmCreateDTO from '../../dtos/AlarmCreateDTO';
import EventCreateDTO from '../../dtos/EventCreateDTO';
import AlarmRequestDTO from '../../dtos/AlarmRequestDTO';
import EventRequestDTO from '../../dtos/EventRequestDTO';
import AlarmDTO from '../../dtos/AlarmDTO';
import EventDTO from '../../dtos/EventDTO';
import ContactDTO from '../../../events/dtos/ContactDTO';
import AppError from '../../../../shared/errors/AppError';
import ActionEmailUseCase from '../action/ActionEmailUseCase';
import ActionSMSUseCase from '../action/ActionSMSUseCase';
import config from '../../../../shared/config/config'
import Pino from '../../../../shared/util/Pino';

interface Props {
  alarmFromRequest: AlarmRequestDTO;
}
export default class CreateEventUseCase {
  constructor(
    private alarmRepository: IAlarmRepository,
    private eventRepository: IEventRepository,
    private levelRepository: ILevelRepository,
    private categoryRepository: ICategoryRepository,
    private originRepository: IOriginRepository,
    private descriptionRepository: IDescriptionRepository,
    private contactRepository: IContactRepository,
    private contactHasActionRepository: IContactHasActionRepository,
  ) { }

  public async execute({ alarmFromRequest }: Props): Promise<AlarmDTO> {
    const eventCreated = await this.createEvent(alarmFromRequest.event);

    const alarmToCreate = new AlarmCreateDTO();
    alarmToCreate.whoSawItId = alarmFromRequest.whoSawItId || null;
    alarmToCreate.whoCheckedItId = alarmFromRequest.whoCheckedItId || null;
    alarmToCreate.eventId = eventCreated.id;

    const alarmCreated = await this.alarmRepository.create(alarmToCreate);

    await this.runActions(eventCreated);

    return alarmCreated;
  }

  private async findLevel(label: string): Promise<any> {
    const level = await this.levelRepository.findByLabel(label);

    if (!level) {
      throw new AppError({
        statusCode: 404,
        title: 'Erro: Nível inexistente',
        message: `Você está tentando criar um evento com um nivel inexistente: ${level}`
      });
    }

    return level;
  }

  private async findCategory(name: string): Promise<number> {
    let category = await this.categoryRepository.findByName(name);

    if (!category) {
      category = await this.categoryRepository.create({
        name: name
      });
    }

    return category.id;
  }

  private async findOrigin(name: string): Promise<number> {
    let origin = await this.originRepository.findByName(name);

    if (!origin) {
      origin = await this.originRepository.create({
        name: name
      });
    }

    return origin.id;
  }

  private async createDescription(content: any): Promise<number> {
    let bufferContent = Buffer.from(content);

    const descriptionCreated = await this.descriptionRepository.create({ content: bufferContent });

    return descriptionCreated.id;
  }

  private async createEvent(eventFromRequest: EventRequestDTO): Promise<EventDTO> {
    const eventToCreate = new EventCreateDTO();
    eventToCreate.name = eventFromRequest.name;
    eventToCreate.userId = eventFromRequest.userId;
    eventToCreate.levelId = (await this.findLevel(eventFromRequest.level)).id;
    eventToCreate.categoryId = (eventFromRequest.category) ? await this.findCategory(eventFromRequest.category) : null;
    eventToCreate.originId = (eventFromRequest.origin) ? await this.findOrigin(eventFromRequest.origin) : null;
    eventToCreate.descriptionId = await this.createDescription(eventFromRequest.description);
    eventToCreate.organizationId = eventFromRequest.organizationId || null;

    const eventCreated = await this.eventRepository.create(eventToCreate);

    return eventCreated;
  }

  private async getContactsList(alarmEvent: EventDTO): Promise<ContactDTO[]> {
    const contacts = await this.contactRepository.findAllByOrganization(alarmEvent.organizationId);

    return contacts;
  }

  private async runActions(alarmEvent: EventDTO): Promise<void> {

    const contacts = await this.getContactsList(alarmEvent);

    let emailContacts = [];
    let phoneContacts = [];

    if (config.nodeEnv == 'production') {
      await Promise.all(
        contacts.map(async contact => {
          const contactHasActions = await this.contactHasActionRepository.findByContact(contact.id)

          contactHasActions.map(contactHasAction => {
            switch (contactHasAction.action.name) {
              case "Email":
                emailContacts.push(contact.email);
                break;

              case "SMS":
                phoneContacts.push(contact.phone);
                break;

              default:
                break;
            }
          })
        })
      );
    } else {
      Pino.info(`Configurando contatos de teste`);
      emailContacts.push(config.testEmail);
      phoneContacts.push(config.testPhone);
    }

    if (emailContacts.length > 0) {
      Pino.info(`Enviando email`);
      let actionUseCase = new ActionEmailUseCase();
      await actionUseCase.execute({ alarmEvent, contactList: emailContacts });
    }

    if (phoneContacts.length > 0) {
      Pino.info(`Enviando sms`);
      let actionUseCase = new ActionSMSUseCase();
      await actionUseCase.execute({ alarmEvent, contactList: phoneContacts });
    }
  }
}