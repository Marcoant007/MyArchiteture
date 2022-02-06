import Action from '../infra/database/models/Action';

export default interface IActionRepository {

  findByName(name: string): Promise<Action>;
  findById(id: number): Promise<Action>;
  findAll(): Promise<Action[]>;
}