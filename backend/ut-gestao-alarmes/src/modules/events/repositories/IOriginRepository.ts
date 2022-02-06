import Origin from '../infra/database/models/Origin';

export default interface IOriginRepository {
  
  findByName(name: string): Promise<Origin>;
  create({ name: string }): Promise<Origin>;
}