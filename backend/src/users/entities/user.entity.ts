import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

export type UserRole = 'user' | 'admin' | 'shopOwner';

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column({ default: 'user' })
    role: UserRole;
}
