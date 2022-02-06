import { getRepository, Repository } from 'typeorm';
import IActionRepository from '../../../repositories/IActionRepository';
import Action from '../models/Action';

export class ActionRepository implements IActionRepository {
  private ormRepository: Repository<Action>;

  constructor() {
    this.ormRepository = getRepository(Action);
  }

  public async findAll(): Promise<Action[]> {
    const action = await this.ormRepository.find();

    return action;
  }

  public async findByName(name: string): Promise<Action> {
    const action = await this.ormRepository.findOne({
      where: {
        name: name
      }
    });

    return action;
  }

  public async findById(id: number): Promise<Action> {
    const action = await this.ormRepository.findOne({
      where: {
        id: id
      }
    });

    return action;
  }
}