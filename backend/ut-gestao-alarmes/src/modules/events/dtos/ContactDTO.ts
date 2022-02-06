import Contact from '../infra/database/models/Contact';
import contactHasACtions from '../infra/database/models/ContactHasAction';

export default class ContactDTO {
  id?: number;
  userId: number;
  organizationId?: number;
  email: string;
  phone?: string;

  constructor(contact: Contact) {
    this.id = (contact.id) ? contact.id : null;
    this.organizationId = (contact.organizationId) ? contact.organizationId : null;
    this.phone = (contact.phone) ? contact.phone : null;

    this.userId = contact.userId;
    this.email = contact.email;
  }
}