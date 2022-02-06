import { Brackets, getRepository, In, Repository } from 'typeorm';
import IAlarmRepository, { FiltersPagedProps } from '../../../repositories/IAlarmRepository';
import AlarmCreateDTO from '../../../dtos/AlarmCreateDTO';
import AlarmDTO from '../../../dtos/AlarmDTO';
import Alarm from '../models/Alarm';

export class AlarmRepository implements IAlarmRepository {
  private ormRepository: Repository<Alarm>;

  constructor() {
    this.ormRepository = getRepository(Alarm);
  }

  public async create(alarm: AlarmCreateDTO): Promise<AlarmDTO> {
    const alarmCreated = this.ormRepository.create(alarm);
    const alarmSaved = await this.ormRepository.save(alarmCreated);

    const alarmToReturn = await this.findById(alarmSaved.id); // para retornar as relações

    return new AlarmDTO(alarmToReturn);
  }

  async findById(id: number): Promise<Alarm> {
    const alarm = await this.ormRepository.findOne({
      where: {
        id: id
      }
    });

    return alarm;
  }

  public async findAllByFiltersPaged(
    { page, limit, checked, organizationId, query }: FiltersPagedProps
  ): Promise<{ alarms: AlarmDTO[], count: number }> {

    let alarms: Alarm[], count: number;

    if (checked === 'any') {

      [alarms, count] = await this.ormRepository.createQueryBuilder('alarm')
        .leftJoinAndSelect('alarm.event', 'event')
        .leftJoinAndSelect('event.description', 'description')
        .leftJoinAndSelect('event.level', 'level')
        .leftJoinAndSelect('event.category', 'category')
        .leftJoinAndSelect('event.origin', 'origin')

        .where((!organizationId) ?
          'event.organizationId IS NULL' :
          'event.organizationId = :organizationId', { organizationId })

        .andWhere(new Brackets(qb => {
          qb.where('category.name ILIKE :query', { query: `%${query}%` })
            .orWhere('origin.name ILIKE :query', { query: `%${query}%` })
            .orWhere('event.name ILIKE :query', { query: `%${query}%` })
            .orWhere('encode(description.content, \'escape\') ILIKE :query', { query: `%${query}%` })
        }))

        .orderBy('alarm.createdAt', 'DESC')
        .limit(limit)
        .offset((page - 1) * limit)
        .getManyAndCount();

    } else {

      [alarms, count] = await this.ormRepository.createQueryBuilder('alarm')
        .leftJoinAndSelect('alarm.event', 'event')
        .leftJoinAndSelect('event.description', 'description')
        .leftJoinAndSelect('event.level', 'level')
        .leftJoinAndSelect('event.category', 'category')
        .leftJoinAndSelect('event.origin', 'origin')

        .where((!organizationId) ?
          'event.organizationId IS NULL' :
          'event.organizationId = :organizationId', { organizationId })

        .andWhere(new Brackets(qb => {
          qb.where(`alarm.whoCheckedItId ${(checked == 'sole') ? 'NOT(IS NULL)' : 'IS NULL'}`)

            .andWhere(new Brackets(qb => {
              qb.where('category.name ILIKE :query', { query: `%${query}%` })
                .orWhere('origin.name ILIKE :query', { query: `%${query}%` })
                .orWhere('event.name ILIKE :query', { query: `%${query}%` })
                .orWhere('encode(description.content, \'escape\') ILIKE :query', { query: `%${query}%` })
            }))
        }))

        .orderBy('alarm.createdAt', 'DESC')
        .limit(limit)
        .offset((page - 1) * limit)
        .getManyAndCount();

    }

    return {
      count,
      alarms: alarms.map(alarm => new AlarmDTO(alarm))
    };
  };


  public async update(alarm: Alarm): Promise<AlarmDTO> {
    const alarmSaved = await this.ormRepository.save(alarm);

    const alarmToReturn = await this.findById(alarmSaved.id); // para retornar as relações

    return new AlarmDTO(alarmToReturn);
  }

  public async updateAsSeen(alarmsList: AlarmDTO[], userId: number): Promise<AlarmDTO[]> {
    for (let i = 0; i < alarmsList.length; i++) {
      await this.ormRepository.save({
        id: alarmsList[i].id,
        whoSawItId: userId,
      }); //partial update
    }

    const alarmsToReturn = await this.ormRepository.find({
      where: {
        id: In(alarmsList.map(alarm => alarm.id))
      },
      order: {
        createdAt: 'DESC'
      }
    });

    return alarmsToReturn.map(alarm => new AlarmDTO(alarm));
  }
}