import { getRepository, Repository } from 'typeorm';
import ILevelRepository from '../../../repositories/ILevelRepository';
import Level from '../models/Level';

export class LevelRepository implements ILevelRepository {
  private ormRepository: Repository<Level>;

  constructor() {
      this.ormRepository = getRepository(Level);
  }

  public async findByLabel(label: string): Promise<Level> {
    const level = await this.ormRepository.findOne({
      where: {
        label: label
      }
    });

    return level;
  }
}