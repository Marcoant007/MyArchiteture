import { Column, Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import Event from './Event';

@Entity('public.alr_alarm')
export default class Alarm {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({
    name: 'created_at'
  })
  createdAt: Date;

  @Column('int', { name: 'who_saw_id' })
  whoSawItId: number;

  @Column('int', { name: 'who_checked_id' })
  whoCheckedItId: number;

  @Column({
    type: 'int4',
    name: 'event_id'
  })
  eventId: number;

  @OneToOne(() => Event, { eager: true })
  @JoinColumn({ name: 'event_id' })
  event: Event;
}