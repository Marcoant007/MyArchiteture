import IEventRepository from '../../repositories/IEventRepository';
import ILevelRepository from '../../repositories/ILevelRepository';
import ICategoryRepository from '../../repositories/ICategoryRepository';
import IOriginRepository from '../../repositories/IOriginRepository';
import IDescriptionRepository from '../../repositories/IDescriptionRepository';
import EventCreateDTO from '../../dtos/EventCreateDTO';
import EventRequestDTO from '../../dtos/EventRequestDTO';
import EventDTO from '../../dtos/EventDTO';
import AppError from '../../../../shared/errors/AppError';

interface Props {
  eventFromRequest: EventRequestDTO;
}

export default class CreateEventUseCase {
  constructor(
    private eventRepository: IEventRepository,
    private levelRepository: ILevelRepository,
    private categoryRepository: ICategoryRepository,
    private originRepository: IOriginRepository,
    private descriptionRepository: IDescriptionRepository,
  ) { }

  public async execute({ eventFromRequest }: Props): Promise<EventDTO> {
    const eventToCreate = new EventCreateDTO();
    eventToCreate.name = eventFromRequest.name;
    eventToCreate.userId = eventFromRequest.userId || null;
    eventToCreate.levelId = await this.findLevel(eventFromRequest.level);
    eventToCreate.categoryId = (eventFromRequest.category) ? await this.findCategory(eventFromRequest.category) : null;
    eventToCreate.originId = (eventFromRequest.origin) ? await this.findOrigin(eventFromRequest.origin) : null;
    eventToCreate.organizationId = eventFromRequest.organizationId || null;
    eventToCreate.descriptionId = (eventFromRequest.origin) ? await this.createDescription(eventFromRequest.description) : null;

    const eventCreated = await this.eventRepository.create(eventToCreate);

    return eventCreated;
  }

  private async findLevel(label: string): Promise<number> {
    const level = await this.levelRepository.findByLabel(label);

    if (!level) {
      throw new AppError({
        statusCode: 404,
        title: 'Erro: Nível inexistente',
        message: `Você está tentando criar um evento com um nivel inexistente: ${level}`
      });
    }

    return level.id;
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
}