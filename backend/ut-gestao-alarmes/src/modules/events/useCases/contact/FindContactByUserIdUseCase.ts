import IContactRepository from '../../repositories/IContactRepository';
import IContactHasActionRepository from '../../repositories/IContactHasActionRepository'
import Contact from '../../infra/database/models/Contact';

interface Props {
  userId: number;
}

export default class FindContactByIdUseCase {
  constructor(
    private contactRepository: IContactRepository,
    private contactHasActionRepository: IContactHasActionRepository,
  ) { }

  public async execute({ userId }: Props): Promise<{ contact: Contact, actions: number[] }> {
    const contact = await this.contactRepository.findByUser(userId);

    let actions: number[];

    if (contact) {
      actions = (await this.contactHasActionRepository.findByContact(contact.id)).map(action => action.actionId);
    }

    return {
      contact,
      actions: actions || null
    };
  }
}