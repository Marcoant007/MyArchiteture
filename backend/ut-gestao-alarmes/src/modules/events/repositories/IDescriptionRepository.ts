import Description from '../infra/database/models/Description';

export default interface IDescriptionRepository {
  
  create({ content: Buffer }): Promise<Description>;
}