import { OwnerResponseDto } from './owner-response.dto';

export class ShopResponseDto {
    id: number;
    name: string;
    description: string;
    latitude: number;
    longitude: number;
    phone: string;
    owner: OwnerResponseDto;
    distanceKm?: number;

    constructor(partial: Partial<ShopResponseDto>) {
        if (partial.distanceKm !== undefined) {
            partial.distanceKm = Number(partial.distanceKm.toFixed(2));
        }
        Object.assign(this, partial);
    }
}
