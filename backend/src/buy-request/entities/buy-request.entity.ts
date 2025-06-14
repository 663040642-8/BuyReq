import { SellRequest } from "src/sell-request/entities/sell-request.entity";
import { User } from "src/users/entities/user.entity";
import { PrimaryGeneratedColumn, ManyToOne, Column, CreateDateColumn, UpdateDateColumn, Entity, OneToMany } from "typeorm";

@Entity()
export class BuyRequest {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    title: string;

    @Column({ nullable: true })
    description?: string;

    @Column('decimal', { nullable: true })
    minPrice?: number;

    @Column('decimal', { nullable: true })
    maxPrice?: number;

    @Column('int', { nullable: true })
    quantity?: number;

    @ManyToOne(() => User, user => user.buyRequests)
    createdBy: User;

    @OneToMany(() => SellRequest, sr => sr.buyRequest)
    sellRequests: SellRequest[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
