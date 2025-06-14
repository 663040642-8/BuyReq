import { BuyRequest } from "src/buy-request/entities/buy-request.entity";
import { User } from "src/users/entities/user.entity";
import { PrimaryGeneratedColumn, ManyToOne, Column, CreateDateColumn, Entity, UpdateDateColumn } from "typeorm";

@Entity()
export class SellRequest {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ nullable: true })
    description?: string;

    @Column('int', { nullable: true })
    quantityOffered?: number;

    @Column('decimal', { nullable: true })
    priceOffered?: number;

    @Column({ default: 'pending' })
    status: 'pending' | 'accepted' | 'rejected';

    @ManyToOne(() => User, user => user.sellRequests)
    seller: User;

    @ManyToOne(() => BuyRequest, br => br.sellRequests, {
        onDelete: 'CASCADE',
    })
    buyRequest: BuyRequest;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
