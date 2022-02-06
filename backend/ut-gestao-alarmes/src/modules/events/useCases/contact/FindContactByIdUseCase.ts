import IContactRepository from '../../repositories/IContactRepository';
import Contact from '../../infra/database/models/Contact';
import AppError from '../../../../shared/errors/AppError';

interface Props {
  contactId: number;
}

export default class FindContactByIdUseCase {
  constructor(
    private contactRepository: IContactRepository,
  ) { }

  public async execute({ contactId }: Props): Promise<Contact> {
    const contact = await this.contactRepository.findById(contactId);

    if (!contact) {
      throw new AppError({
        statusCode: 404,
        title: 'Erro: Contato inexistente',
        message: 'Você está tentando buscar um contato inexistente'
      });
    }

    return contact;
  }
}