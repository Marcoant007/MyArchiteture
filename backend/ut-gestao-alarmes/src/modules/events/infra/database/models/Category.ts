import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('public.alr_event_category')
export default class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar')
  name: string;
}