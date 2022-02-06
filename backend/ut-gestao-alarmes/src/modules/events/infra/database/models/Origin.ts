import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('public.alr_event_origin')
export default class Origin {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar')
  name: string;
}