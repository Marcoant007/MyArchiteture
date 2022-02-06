import { Request, Response } from 'express';
import Pino from '../../../../../shared/util/Pino'
import { ContactRepository } from '../../database/repositories/ContactRepository';
import { ActionRepository } from '../../database/repositories/ActionRepository';
import { ContactHasActionRepository } from '../../database/repositories/ContactHasActionRepository';
import CreateContactUseCase from '../../../useCases/contact/CreateContactUseCase';
import FindContactByIdUseCase from '../../../useCases/contact/FindContactByIdUseCase';
import FindAllContactsByFiltersPagedUseCase from '../../../useCases/contact/FindAllContactsByFiltersPagedUseCase';
import DeleteContactUseCase from '../../../useCases/contact/DeleteContactUseCase';
import UpdateContactUseCase from '../../../useCases/contact/UpdateContactUseCase';
import FindContactByUserIdUseCase from '../../../useCases/contact/FindContactByUserIdUseCase';

export default class ContactController {

  public async create(request: Request, response: Response) {
    const contactRepository = new ContactRepository();
    const actionRepository = new ActionRepository();
    const contactHasActionRepository = new ContactHasActionRepository();

    try {
      const contact = request.body;

      const createContactUseCase = new CreateContactUseCase(contactRepository, actionRepository, contactHasActionRepository);
      const contactCreated = await createContactUseCase.execute({ contactToCreate: contact });

      return response.status(201).json(contactCreated);
    } catch (err) {
      Pino.error(err);
      return response.status(err.statusCode || 500).json({ message: err.message, title: err.title });
    }
  }

  public async findById(request: Request, response: Response) {
    const contactRepository = new ContactRepository();

    try {
      const { id } = request.params;

      const findContactById = new FindContactByIdUseCase(contactRepository);
      const contact = await findContactById.execute({ contactId: +id });

      return response.status(200).json(contact);
    } catch (err) {
      Pino.error(err);
      return response.status(err.statusCode || 500).json({ message: err.message, title: err.title });
    }
  }

  public async findByUserId(request: Request, response: Response) {
    const contactRepository = new ContactRepository();
    const contactHasActionRepository = new ContactHasActionRepository()

    try {
      const { id } = request.params;

      const findContactByUserIdUseCase = new FindContactByUserIdUseCase(contactRepository, contactHasActionRepository);
      const { contact, actions } = await findContactByUserIdUseCase.execute({ userId: +id });

      return response.status(200).json({ contact, actions });
    } catch (err) {
      Pino.error(err);
      return response.status(err.statusCode || 500).json({ message: err.message, title: err.title });
    }
  }

  public async findAllPAged(request: Request, response: Response) {
    const contactRepository = new ContactRepository();

    try {
      const { page, limit, organization } = request.query;
      const getPage = page || 1;
      const getLimit = limit || 10;
      const getOrganization = organization || null;

      const findAllContactsByFiltersPagedUseCase = new FindAllContactsByFiltersPagedUseCase(contactRepository);
      const { contacts, count } = await findAllContactsByFiltersPagedUseCase.execute({
        limit: +getLimit,
        page: +getPage,
        organizationId: +getOrganization,
      });

      return response.status(200).json({ contacts, count });
    } catch (err) {
      Pino.error(err);
      return response.status(err.statusCode || 500).json({ message: err.message, title: err.title });
    }
  }

  public async delete(request: Request, response: Response) {
    const contactRepository = new ContactRepository();
    const contactHasActionRepository = new ContactHasActionRepository();

    try {
      const { id } = request.params;

      const deleteContactUseCase = new DeleteContactUseCase(contactRepository, contactHasActionRepository);
      await deleteContactUseCase.execute({ contactId: +id });

      return response.status(204).send();
    } catch (err) {
      Pino.error(err);
      return response.status(err.statusCode || 500).json({ message: err.message, title: err.title });
    }
  }

  public async update(request: Request, response: Response) {
    const contactRepository = new ContactRepository();
    const actionRepository = new ActionRepository();
    const contactHasActionRepository = new ContactHasActionRepository();

    try {
      const { id } = request.params;
      const contact = request.body;

      const updateContactUseCase = new UpdateContactUseCase(contactRepository, actionRepository, contactHasActionRepository);
      const contactUpdated = await updateContactUseCase.execute({
        contactFromRequest: contact,
        contactId: +id
      });

      return response.status(200).json(contactUpdated);
    } catch (err) {
      Pino.error(err);
      return response.status(err.statusCode || 500).json({ message: err.message, title: err.title });
    }
  }
}