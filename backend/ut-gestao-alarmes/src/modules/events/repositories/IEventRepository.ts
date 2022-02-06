import Event from '../infra/database/models/Event';
import EventCreateDTO from '../dtos/EventCreateDTO';
import EventDTO from '../dtos/EventDTO';

export interface FiltersPagedProps {
  page: number;
  limit: number;
  organizationId: number;
  query: string;
}

export default interface IEventRepository {

  create(event: EventCreateDTO): Promise<EventDTO>;
  findById(id: number): Promise<Event>;
  findAllByFiltersPaged(
    { page, limit, organizationId, query }: FiltersPagedProps
  ): Promise<{ events: EventDTO[], count: number }>;

}