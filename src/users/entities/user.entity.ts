
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ length: 50 })
  public username: string;

  @Column({ length: 50 })
  public email: string;
}