import IContactRepository from '../../repositories/IContactRepository';
import IContactHasActionRepository from '../../repositories/IContactHasActionRepository';
import AppError from '../../../../shared/errors/AppError';

interface Props {
  contactId: number;
}

export default class DeleteContactUseCase {
  constructor(
    private contactRepository: IContactRepository,
    private contactHasActionRepository: IContactHasActionRepository,
  ) { }

  public async execute({ contactId }: Props): Promise<void> {
    await this.findContact(contactId);

    const teste = await this.deleteContactHasActions(contactId);

    await this.contactRepository.delete(contactId);
  }

  private async findContact(contactId: number): Promise<void> {
    const contact = await this.contactRepository.findById(contactId);

    if (!contact) {
      throw new AppError({
        statusCode: 404,
        title: 'Erro: Contato inexistente',
        message: 'Você está tentando deletar um contato inexistente'
      });
    }
  }

  private async deleteContactHasActions(contactId: number): Promise<void> {
    await this.contactHasActionRepository.deleteFromContact(contactId);
  }
}