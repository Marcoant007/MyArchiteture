import { getRepository, Repository } from 'typeorm';
import ICategoryRepository from '../../../repositories/ICategoryRepository';
import Category from '../models/Category';

export class CategoryRepository implements ICategoryRepository {
  private ormRepository: Repository<Category>;

  constructor() {
      this.ormRepository = getRepository(Category);
  }

  public async findByName(name: string): Promise<Category> {
    const category = await this.ormRepository.findOne({
      where: {
        name: name
      }
    });

    return category;
  }

  public async create(category: Category): Promise<Category> {
    const categoryCreated = this.ormRepository.create(category);
    const categorySaved = await this.ormRepository.save(categoryCreated);
    
    return categorySaved;
  }
}