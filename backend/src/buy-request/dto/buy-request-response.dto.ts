import { BuyRequest } from '../entities/buy-request.entity';

export class  BuyRequestResponseDto {
  id: string;
  title: string;
  description?: string;
  minPrice?: number;
  maxPrice?: number;
  quantity?: number;
  createdAt: Date;
  updatedAt: Date;
  createdBy: {
    id: string;
    firstName: string;
    lastName: string;
    phone: string;
  };

  constructor(entity: BuyRequest) {
    this.id = entity.id;
    this.title = entity.title;
    this.description = entity.description;
    this.minPrice = entity.minPrice;
    this.maxPrice = entity.maxPrice;
    this.quantity = entity.quantity;
    this.createdAt = entity.createdAt;
    this.updatedAt = entity.updatedAt;

    this.createdBy = {
      id: entity.createdBy.id,
      firstName: entity.createdBy.firstName,
      lastName: entity.createdBy.lastName,
      phone: entity.createdBy.phone,
    };
  }
}
