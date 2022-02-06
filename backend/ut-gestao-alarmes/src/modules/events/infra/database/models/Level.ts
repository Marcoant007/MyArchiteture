import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('public.alr_event_level')
export default class level {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar')
  label: string;

  @Column('int4')
  value: string;
}