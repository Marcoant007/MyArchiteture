import { getRepository, Repository, IsNull } from 'typeorm';
import IContactRepository, { FiltersPagedProps } from '../../../repositories/IContactRepository';
import Contact from '../models/Contact';
import ContactCreateDTO from '../../../dtos/ContactCreateDTO';
import ContactDTO from '../../../dtos/ContactDTO';

export class ContactRepository implements IContactRepository {
  private ormRepository: Repository<Contact>;

  constructor() {
    this.ormRepository = getRepository(Contact);
  }

  public async create(contact: ContactCreateDTO): Promise<ContactDTO> {
    const contactCreated = this.ormRepository.create(contact);
    const contactSaved = await this.ormRepository.save(contactCreated);

    return new ContactDTO(contactSaved);
  }

  public async update(contact: Contact): Promise<ContactDTO> {
    const contactSaved = await this.ormRepository.save(contact);

    return new ContactDTO(contactSaved);
  }

  public async findById(id: number): Promise<Contact> {
    const contact = await this.ormRepository.findOne({
      where: {
        id: id
      }
    });

    return contact;
  }

  public async findByUser(userId: number): Promise<Contact> {
    const contact = await this.ormRepository.findOne({
      where: {
        userId: userId
      }
    });

    return contact;
  }

  public async findAllByFiltersPaged({ page, limit, organizationId }: FiltersPagedProps): Promise<{ contacts: ContactDTO[], count: number }> {
    const [contacts, count] = await this.ormRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      where: {
        organizationId: (organizationId) ? organizationId : IsNull()
      },
      order: {
        updatedAt: 'DESC'
      }
    });

    return {
      count,
      contacts: contacts.map(contact => new ContactDTO(contact))
    };
  }

  public async findAllByOrganization(organizationId: number): Promise<ContactDTO[]> {
    const contacts = await this.ormRepository.find({
      where: {
        organizationId: organizationId
      }
    });

    return contacts.map(contact => new ContactDTO(contact))
  }

  public async delete(id: number): Promise<void> {
    await this.ormRepository.delete(id);
  }
}