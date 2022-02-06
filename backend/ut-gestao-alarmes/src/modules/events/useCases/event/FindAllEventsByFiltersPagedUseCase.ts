import IEventRepository, { FiltersPagedProps } from '../../repositories/IEventRepository';
import EventDTO from '../../dtos/EventDTO';

interface Props {
  page: number;
  limit: number;
  organizationId?: number;
  query: string;
}

export default class FindAllEventsByFiltersPagedUseCase {
  constructor(
    private EventRepository: IEventRepository,
  ) { }

  public async execute(
    { page, limit, query, organizationId }: Props
  ): Promise<{ events: EventDTO[], count: number }> {

    const filters: FiltersPagedProps = {
      page,
      limit,
      query,
      organizationId: organizationId || null,
    }

    const { events, count } = await this.EventRepository.findAllByFiltersPaged(filters);

    return { events, count };
  }
}