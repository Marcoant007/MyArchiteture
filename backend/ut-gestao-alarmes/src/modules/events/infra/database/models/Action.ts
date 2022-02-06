import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('public.alr_action')
export default class Action {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar')
  name: string;
}