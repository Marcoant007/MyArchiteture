import IContactRepository from '../../repositories/IContactRepository';
import IContactHasActionRepository from '../../repositories/IContactHasActionRepository';
import IActionRepository from '../../repositories/IActionRepository';
import ContactDTO from '../../dtos/ContactDTO';
import ContactRequestDTO from '../../dtos/ContactRequestDTO';
import Contact from '../../infra/database/models/Contact';
import AppError from '../../../../shared/errors/AppError';

interface Props {
  contactFromRequest: ContactRequestDTO;
  contactId: number;
}

export default class CreateContactUseCase {
  constructor(
    private contactRepository: IContactRepository,
    private actionRepository: IActionRepository,
    private contactHasActionRepository: IContactHasActionRepository,
  ) { }

  public async execute({ contactFromRequest, contactId }: Props): Promise<ContactDTO> {
    await this.findActions(contactFromRequest.actions);

    const contactToUpdate = await this.findContact(contactId);

    contactToUpdate.email = contactFromRequest.email;
    contactToUpdate.phone = contactFromRequest.phone;

    await this.updateContactHasActions(contactId, contactFromRequest.actions);

    const contactUpdated = await this.contactRepository.update(contactToUpdate);

    return contactUpdated;
  }

  private async findActions(actions: number[]): Promise<void> {
    if (actions) {
      for (let i = 0; i < actions.length; i++) {
        const actionFromDB = await this.actionRepository.findById(actions[i]);

        if (!actionFromDB) {
          throw new AppError({
            statusCode: 404,
            title: 'Erro: Ação inexistente',
            message: `Você está tentando atualizar um contato com uma ação inexistente: ${actionFromDB}`
          });
        }
      }
    }
  }

  private async findContact(id: number): Promise<Contact> {
    const contact = await this.contactRepository.findById(id);

    if (!contact) {
      throw new AppError({
        statusCode: 404,
        title: 'Erro: Contato inexistente',
        message: `Você está tentando criar um contato inexistente: ${id}`
      });
    }

    return contact;
  }

  private async updateContactHasActions(contactId: number, actions: number[]): Promise<void> {
    await this.contactHasActionRepository.deleteFromContact(contactId);

    for (let i = 0; i < actions.length; i++) {
      await this.contactHasActionRepository.create({
        contactId,
        actionId: actions[i]
      });
    }
  }
}