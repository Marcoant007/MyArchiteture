export default class EventCreateDTO {
  name: string;
  userId?: number;
  level: string;
  category?: string;
  origin?: string;
  description?: any;
  organizationId?: number;
}