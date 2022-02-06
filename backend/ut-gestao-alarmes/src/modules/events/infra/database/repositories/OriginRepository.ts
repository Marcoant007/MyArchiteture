import { getRepository, Repository } from 'typeorm';
import IOriginRepository from '../../../repositories/IOriginRepository';
import Origin from '../models/Origin';

export class OriginRepository implements IOriginRepository {
  private ormRepository: Repository<Origin>;

  constructor() {
      this.ormRepository = getRepository(Origin);
  }

  public async findByName(name: string): Promise<Origin> {
    const origin = await this.ormRepository.findOne({
      where: {
        name: name
      }
    });

    return origin;
  }

  public async create(origin: Origin): Promise<Origin> {
    const originCreated = this.ormRepository.create(origin);
    const originSaved = await this.ormRepository.save(originCreated);
    
    return originSaved;
  }
}