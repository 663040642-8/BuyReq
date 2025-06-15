export interface BuyRequest {
  id: string;
  title: string;
  description?: string;
  minPrice?: number;
  maxPrice?: number;
  quantity?: number;
  createdAt: string;
  updatedAt: string;
  createdBy: {
    id: string;
    firstName: string;
    lastName: string;
    avatarUrl?: string;
  };
}

export interface CreateBuyRequestDto {
  title: string;
  description?: string;
  minPrice?: number;
  maxPrice?: number;
  quantity?: number;
}