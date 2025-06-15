export interface CreateSellRequestDto {
  buyRequestId: string;
  description?: string;
  quantityOffered?: number;
  priceOffered?: number;
}