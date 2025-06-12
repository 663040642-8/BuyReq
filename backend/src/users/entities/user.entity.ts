import { Shop } from 'src/shops/entities/shop.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';

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

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
    
    @Column({ default: 'user' })
    role: UserRole;

    @OneToMany(() => Shop, (shop) => shop.owner)
    shops: Shop[];
}
