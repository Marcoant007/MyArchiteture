import { getRepository, Repository } from 'typeorm';
import IDescriptionRepository from '../../../repositories/IDescriptionRepository';
import Description from '../models/Description';

export class DescriptionRepository implements IDescriptionRepository {
  private ormRepository: Repository<Description>;

  constructor() {
      this.ormRepository = getRepository(Description);
  }

  public async create(Description: Description): Promise<Description> {
    const descriptionCreated = this.ormRepository.create(Description);
    const descriptionSaved = await this.ormRepository.save(descriptionCreated);
    
    return descriptionSaved;
  }
}