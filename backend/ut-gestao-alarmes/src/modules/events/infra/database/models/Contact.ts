import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';

@Entity('public.alr_contact')
export default class Contact {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({
    name: 'created_at'
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at'
  })
  updatedAt: Date;

  @Column('int', { name: 'user_id' })
  userId: number;

  @Column('int', { name: 'organization_id' })
  organizationId: number;

  @Column('varchar')
  email: string;

  @Column('varchar')
  phone: string;
}