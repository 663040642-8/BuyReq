import { SellRequest } from "../entities/sell-request.entity";

export class SellRequestResponseDto {
    id: string;
    description?: string;
    priceOffered?: number;
    quantityOffered?: number;
    status: string;
    createdAt: Date;
    updatedAt: Date;
    buyRequest: {
        id: string;
    };
    seller: {
        id: string;
        firstName: string;
        lastName: string;
        phone: string;
    };

    constructor(entity: SellRequest) {
        this.id = entity.id;
        this.description = entity.description;
        this.priceOffered = entity.priceOffered;
        this.quantityOffered = entity.quantityOffered;
        this.status = entity.status;
        this.createdAt = entity.createdAt;
        this.updatedAt = entity.updatedAt;
        
        this.buyRequest = {
            id: entity.buyRequest.id,
        };

        this.seller = {
            id: entity.seller.id,
            firstName: entity.seller.firstName,
            lastName: entity.seller.lastName,
            phone: entity.seller.phone,
        };
    }
}
