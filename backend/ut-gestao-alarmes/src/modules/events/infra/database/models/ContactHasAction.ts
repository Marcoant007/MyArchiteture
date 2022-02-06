import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import Contact from './Contact';
import Action from './Action';

@Entity('public.alr_contact_has_action')
export default class ContactHasAction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('int', { name: 'contact_id' })
  contactId: number;

  @Column('int', { name: 'action_id' })
  actionId: number;

  @ManyToOne(() => Contact)
  @JoinColumn({ name: 'contact_id' })
  contact: Contact;


  @ManyToOne(() => Action, { eager: true })
  @JoinColumn({ name: 'action_id' })
  action: Action;
}