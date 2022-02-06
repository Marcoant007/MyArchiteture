import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import Category from './Category';
import Level from './Level';
import Description from './Description';
import Origin from './Origin'

@Entity('public.alr_event')
export default class Event {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({
    name: 'created_at'
  })
  createdAt: Date;

  @Column('varchar')
  name: string;

  @Column({
    type: 'int4',
    name: 'user_id'
  })
  userId: number;

  @Column({
    type: 'int4',
    name: 'organization_id'
  })
  organizationId: number;

  @Column({
    type: 'int4',
    name: 'level_id'
  })
  levelId: number;

  @Column({
    type: 'int4',
    name: 'category_id'
  })
  categoryId: number;

  @Column({
    type: 'int4',
    name: 'origin_id'
  })
  originId: number;

  @Column({
    type: 'int4',
    name: 'description_id'
  })
  descriptionId: number;

  @ManyToOne(() => Level, { eager: true })
  @JoinColumn({ name: 'level_id' })
  level: Level;

  @ManyToOne(() => Category, { eager: true })
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @ManyToOne(() => Origin, { eager: true })
  @JoinColumn({ name: 'origin_id' })
  origin: Origin;

  @OneToOne(() => Description, { eager: true })
  @JoinColumn({ name: 'description_id' })
  description: Description;

}