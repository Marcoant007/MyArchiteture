import Category from '../infra/database/models/Category';

export default interface ICategoryRepository {
  
  findByName(name: string): Promise<Category>;
  create({ name: string }): Promise<Category>;
}