import IContactRepository from '../../repositories/IContactRepository';
import ContactDTO from '../../dtos/ContactDTO';

interface Props {
  page: number;
  limit: number;
  organizationId: number;
}

export default class FindAllContactsByFiltersPagedUseCase {
  constructor(
    private contactRepository: IContactRepository,
  ) { }

  public async execute(
    { page, limit, organizationId }: Props
  ): Promise<{ contacts: ContactDTO[], count: number }> {

    const filters = {
      page,
      limit,
      organizationId,
    }

    const { contacts, count } = await this.contactRepository.findAllByFiltersPaged(filters);

    return { contacts, count };
  }
}