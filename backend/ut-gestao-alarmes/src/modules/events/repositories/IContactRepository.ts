import Contact from '../infra/database/models/Contact';
import ContactDTO from '../dtos/ContactDTO';
import ContactCreateDTO from '../dtos/ContactCreateDTO';


export interface FiltersPagedProps {
  page: number;
  limit: number;
  organizationId: number;
}

export default interface IContactRepository {

  create(contact: ContactCreateDTO): Promise<ContactDTO>;
  update(contact: Contact): Promise<ContactDTO>;
  delete(id: number): Promise<void>;
  findById(id: number): Promise<Contact>;
  findByUser(userId: number): Promise<Contact>;
  findAllByFiltersPaged({ page, limit, organizationId }: FiltersPagedProps): Promise<{ contacts: ContactDTO[], count: number }>;
  findAllByOrganization(organizationId: number): Promise<ContactDTO[]>;
}