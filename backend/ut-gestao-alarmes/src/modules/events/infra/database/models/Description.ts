import { Column, Entity, PrimaryGeneratedColumn, JoinColumn, OneToOne } from 'typeorm';

@Entity('public.alr_event_description')
export default class Description {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('bytea')
  content: Buffer; // ou Buffer, sla?

}