import Level from '../infra/database/models/Level';

export default interface ILevelRepository {
  
  findByLabel(label: string): Promise<Level>;
}