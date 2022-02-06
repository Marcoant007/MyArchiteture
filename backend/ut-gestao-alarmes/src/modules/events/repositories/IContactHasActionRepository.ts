import ContactHasAction from '../infra/database/models/ContactHasAction'

export interface CreateProps {
  contactId: number;
  actionId: number;
}

export default interface IContactHasActionRepository {

  create({ contactId, actionId }: CreateProps): Promise<void>;
  findByContact(contactId: number): Promise<ContactHasAction[]>;
  deleteFromContact(contactId: number): Promise<void>;
}