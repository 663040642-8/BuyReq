import { BuyRequest } from 'src/buy-request/entities/buy-request.entity';
import { SellRequest } from 'src/sell-request/entities/sell-request.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export type UserRole = 'user' | 'admin';

@Entity('users')
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column({ nullable: true, unique: true })
    phone: string;

    @Column({ nullable: true })
    avatarUrl?: string;

    @Column({ default: 'user' })
    role: UserRole;

    @OneToMany(() => BuyRequest, br => br.createdBy)
    buyRequests: BuyRequest[];

    @OneToMany(() => SellRequest, sr => sr.seller)
    sellRequests: SellRequest[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
