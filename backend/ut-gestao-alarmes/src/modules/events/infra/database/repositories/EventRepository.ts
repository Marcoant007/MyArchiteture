import { Brackets, getRepository, Repository } from 'typeorm';
import IEventRepository, { FiltersPagedProps } from '../../../repositories/IEventRepository';
import EventCreateDTO from '../../../dtos/EventCreateDTO';
import EventDTO from '../../../dtos/EventDTO';
import Event from '../models/Event';

export class EventRepository implements IEventRepository {
  private ormRepository: Repository<Event>;

  constructor() {
    this.ormRepository = getRepository(Event);
  }

  public async create(event: EventCreateDTO): Promise<EventDTO> {
    const eventCreated = this.ormRepository.create(event);
    const eventSaved = await this.ormRepository.save(eventCreated);

    const eventToReturn = await this.findById(eventSaved.id); // para retornar as relações

    return new EventDTO(eventToReturn);
  }

  public async findById(id: number): Promise<Event> {
    const event = await this.ormRepository.findOne({
      where: {
        id: id
      }
    });

    return event;
  }

  public async findAllByFiltersPaged(
    { page, limit, organizationId, query }: FiltersPagedProps
  ): Promise<{ events: EventDTO[], count: number }> {

    const [events, count] = await this.ormRepository.createQueryBuilder('event')
      .leftJoinAndSelect('event.description', 'description')
      .leftJoinAndSelect('event.level', 'level')
      .leftJoinAndSelect('event.category', 'category')
      .leftJoinAndSelect('event.origin', 'origin')
      .leftJoinAndSelect('event.user', 'user')

      .where((!organizationId) ?
        'event.organizationId IS NULL' :
        'event.organizationId = :organizationId', { organizationId })

      .andWhere(new Brackets(qb => {
        qb.where('category.name ILIKE :query', { query: `%${query}%` })
          .orWhere('origin.name ILIKE :query', { query: `%${query}%` })
          .orWhere('event.name ILIKE :query', { query: `%${query}%` })
          .orWhere('user.name ILIKE :query', { query: `%${query}%` })
          .orWhere('encode(description.content, \'escape\') ILIKE :query', { query: `%${query}%` })
      }))

      .orderBy('event.createdAt', 'DESC')
      .limit(limit)
      .offset((page - 1) * limit)
      .getManyAndCount();

    return {
      count,
      events: events.map(event => new EventDTO(event))
    };
  };
}