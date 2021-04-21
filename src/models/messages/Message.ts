import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import User from '../users/User';

@Entity('messages')
class Messages {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  admin_id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column()
  user_id: string;

  @Column()
  text: string;

  @CreateDateColumn()
  created_at: Date;
}

export default Messages;
