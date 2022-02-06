import { getRepository, Repository } from 'typeorm';
import IContactHasActionRepository, { CreateProps } from '../../../repositories/IContactHasActionRepository';
import ContactHasAction from '../models/ContactHasAction';

export class ContactHasActionRepository implements IContactHasActionRepository {
  private ormRepository: Repository<ContactHasAction>;

  constructor() {
    this.ormRepository = getRepository(ContactHasAction);
  }

  public async create({ contactId, actionId }: CreateProps): Promise<void> {
    const contactHasActionCreated = this.ormRepository.create({ contactId, actionId });
    this.ormRepository.save(contactHasActionCreated);
  }

  public async findByContact(contactId: number): Promise<ContactHasAction[]> {
    const contactHasActions = await this.ormRepository.find({
      where: {
        contactId: contactId
      }
    });

    return contactHasActions;
  }

  public async deleteFromContact(contactId: number): Promise<void> {
    // depois tem que resolver de forma melhor, mas basicamente às vezes o typeorm n deleta tudo (?)
    // então isso garante q realmente deletou tudo
    let count = await this.ormRepository.count({ contactId: contactId });

    while (count != 0) {
      await this.ormRepository.delete({ contactId: contactId });
      count = await this.ormRepository.count({ contactId: contactId });
    }
  }
}