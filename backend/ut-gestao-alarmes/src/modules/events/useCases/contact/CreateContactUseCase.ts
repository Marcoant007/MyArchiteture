import IContactRepository from '../../repositories/IContactRepository';
import IContactHasActionRepository from '../../repositories/IContactHasActionRepository';
import IActionRepository from '../../repositories/IActionRepository';
import ContactCreateDTO from '../../dtos/ContactCreateDTO';
import ContactDTO from '../../dtos/ContactDTO';
import ContactRequestDTO from '../../dtos/ContactRequestDTO';
import AppError from '../../../../shared/errors/AppError';

interface Props {
  contactToCreate: ContactRequestDTO;
}

export default class CreateContactUseCase {
  constructor(
    private contactRepository: IContactRepository,
    private actionRepository: IActionRepository,
    private contactHasActionRepository: IContactHasActionRepository,
  ) { }

  public async execute({ contactToCreate }: Props): Promise<ContactDTO> {
    await this.findActions(contactToCreate.actions);

    await this.findIfContactExists(contactToCreate.userId);

    const contactCreated = await this.createContact({
      email: contactToCreate.email,
      userId: contactToCreate.userId,
      organizationId: contactToCreate.organizationId || null,
      phone: contactToCreate.phone || null
    });

    await this.createContactHasActions(contactCreated.id, contactToCreate.actions);

    return contactCreated;
  }

  private async findActions(actions: number[]): Promise<void> {
    if (actions) {
      for (let i = 0; i < actions.length; i++) {
        const actionFromDB = await this.actionRepository.findById(actions[i]);

        if (!actionFromDB) {
          throw new AppError({
            statusCode: 404,
            title: 'Erro: Ação inexistente',
            message: `Você está tentando criar um contato com uma ação inexistente: ${actionFromDB}`
          });
        }
      }
    }
  }

  private async createContact(contact: ContactCreateDTO): Promise<ContactDTO> {
    const contactCreated = await this.contactRepository.create(contact);

    return contactCreated;
  }

  private async findIfContactExists(userId: number): Promise<void> {
    const contact = await this.contactRepository.findByUser(userId);

    if (contact) {
      throw new AppError({
        statusCode: 409,
        title: 'Erro: Contato já existe',
        message: 'Você está tentando criar um contato que já existe'
      });
    }
  }

  private async createContactHasActions(contactId: number, actions: number[]): Promise<void> {
    if (actions) {
      actions.map(async action => {
        this.contactHasActionRepository.create({
          contactId: contactId,
          actionId: action
        });
      });
    }
  }
}