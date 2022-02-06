import Description from '../infra/database/models/Description'

export default class EventCreateDTO {
  name: string;
  userId?: number;
  levelId: number;
  categoryId?: number;
  originId?: number;
  descriptionId?: number;
  organizationId?: number;
}