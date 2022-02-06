
export default class ContactRequestDTO {
  userId: number;
  organizationId?: number;
  email: string;
  phone?: string;
  actions?: number[];
}