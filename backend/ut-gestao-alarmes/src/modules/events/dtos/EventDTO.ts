import Event from '../infra/database/models/Event';

export default class EventDTO {
  id?: number;
  createdAt: string;
  name: string;
  userId?: number;
  level: string;
  category: string;
  origin: string;
  description: any;
  organizationId: number;

  constructor(event: Event) {
    const createdDate = new Date(event.createdAt);
    const options = {
      timeZone: 'America/Sao_Paulo',
      dateStyle: 'short',
      timeStyle: 'medium',
    }


    this.id = event.id;
    this.createdAt = `${createdDate.toLocaleString('pt-br', options)}`;
    this.userId = (event.userId) ? (event.userId) : null;
    this.level = (event.level) ? event.level.label : '';
    this.category = (event.category) ? event.category.name : '';
    this.origin = (event.origin) ? event.origin.name : '';
    this.description = (event.description) ? event.description.content.toString() : '';
    this.organizationId = event.organizationId;
    this.name = event.name;
  }
}