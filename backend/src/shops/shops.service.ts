import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Between, Repository } from 'typeorm';
import { Shop } from './entities/shop.entity';
import { CreateShopDto } from './dto/create-shop.dto';
import { UpdateShopDto } from './dto/update-shop.dto';
import { ShopResponseDto } from './dto/shop-response.dto';
import { OwnerResponseDto } from './dto/owner-response.dto';



@Injectable()
export class ShopsService {
    constructor(
        @Inject('SHOPS_REPOSITORY')
        private shopsRepository: Repository<Shop>
    ) { }

    private deg2rad(deg: number) {
        return deg * (Math.PI / 180);
    }

    private getDistanceFromLatLonInKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
        const R = 6371;
        const dLat = this.deg2rad(lat2 - lat1);
        const dLon = this.deg2rad(lon2 - lon1);
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c;
    }

    async create(createShopDto: CreateShopDto, userId: number): Promise<ShopResponseDto> {
        const shop = this.shopsRepository.create({
            ...createShopDto,
            owner: { id: userId },
        });
        const savedShop = await this.shopsRepository.save(shop);

        const shopWithOwner = await this.shopsRepository.findOne({
            where: { id: savedShop.id },
            relations: ['owner'],
        });

        if (!shopWithOwner) throw new NotFoundException('Shop not found after creation');

        const ownerDto = new OwnerResponseDto({
            owner_id: shopWithOwner.owner.id,
            owner_name: `${shopWithOwner.owner.firstName} ${shopWithOwner.owner.lastName}`,
            owner_email: shopWithOwner.owner.email,
        });

        return new ShopResponseDto({ ...shopWithOwner, owner: ownerDto });
    }

    async getShopById(id: number): Promise<ShopResponseDto> {
        const shop = await this.shopsRepository.findOne({
            where: { id },
            relations: ['owner'],
        });
        if (!shop) throw new NotFoundException();

        const ownerDto = new OwnerResponseDto({
            owner_id: shop.owner.id,
            owner_name: `${shop.owner.firstName} ${shop.owner.lastName}`,
            owner_email: shop.owner.email,
        });

        return new ShopResponseDto({ ...shop, owner: ownerDto });
    }

    // async findAll(userLat?: number, userLng?: number, radiusKm = 10): Promise<ShopResponseDto[]> {
    //     if (userLat && userLng) {
    //         const { entities, raw } = await this.shopsRepository
    //             .createQueryBuilder('shop')
    //             .leftJoinAndSelect('shop.owner', 'owner')
    //             .addSelect(
    //                 `ST_Distance_Sphere(
    //       POINT(shop.longitude, shop.latitude),
    //       POINT(:lng, :lat)
    //     ) / 1000`,
    //                 'distance_km'
    //             )
    //             .where(
    //                 `ST_Distance_Sphere(
    //       POINT(shop.longitude, shop.latitude),
    //       POINT(:lng, :lat)
    //     ) <= :radius`,
    //                 {
    //                     lng: userLng,
    //                     lat: userLat,
    //                     radius: radiusKm * 1000,
    //                 }
    //             )
    //             .orderBy('distance_km', 'ASC')
    //             .getRawAndEntities();

    //         return entities.map((shop, index) => {
    //             const distanceKm = parseFloat(raw[index].distance_km);
    //             return new ShopResponseDto({
    //                 id: shop.id,
    //                 name: shop.name,
    //                 description: shop.description,
    //                 latitude: shop.latitude,
    //                 longitude: shop.longitude,
    //                 phone: shop.phone,
    //                 owner: new OwnerResponseDto({
    //                     owner_id: shop.owner.id,
    //                     owner_name: `${shop.owner.firstName} ${shop.owner.lastName}`,
    //                     owner_email: shop.owner.email,
    //                 }),
    //                 distanceKm,
    //             });
    //         });
    //     }

    //     const allShops = await this.shopsRepository.find({ relations: ['owner'] });
    //     return allShops.map(shop =>
    //         new ShopResponseDto({
    //             id: shop.id,
    //             name: shop.name,
    //             description: shop.description,
    //             latitude: shop.latitude,
    //             longitude: shop.longitude,
    //             phone: shop.phone,
    //             owner: new OwnerResponseDto({
    //                 owner_id: shop.owner.id,
    //                 owner_name: `${shop.owner.firstName} ${shop.owner.lastName}`,
    //                 owner_email: shop.owner.email,
    //             }),
    //         }),
    //     );
    // }
    async findAll(): Promise<ShopResponseDto[]> {
        const shops = await this.shopsRepository.find({ relations: ['owner'] });

        return shops.map(shop => new ShopResponseDto({
            id: shop.id,
            name: shop.name,
            description: shop.description,
            latitude: shop.latitude,
            longitude: shop.longitude,
            phone: shop.phone,
            owner: new OwnerResponseDto({
                owner_id: shop.owner.id,
                owner_name: `${shop.owner.firstName} ${shop.owner.lastName}`,
                owner_email: shop.owner.email,
            }),
        }));
    }

    async update(id: number, updateShopDto: UpdateShopDto): Promise<ShopResponseDto> {
        const shop = await this.shopsRepository.findOne({ where: { id } });
        if (!shop) throw new NotFoundException();

        await this.shopsRepository.update(id, updateShopDto);

        const updatedShop = await this.shopsRepository.findOne({
            where: { id },
            relations: ['owner'],
        });
        if (!updatedShop) throw new NotFoundException('Shop not found after update');

        const ownerDto = new OwnerResponseDto({
            owner_id: updatedShop.owner.id,
            owner_name: `${updatedShop.owner.firstName} ${updatedShop.owner.lastName}`,
            owner_email: updatedShop.owner.email,
        });

        return new ShopResponseDto({ ...updatedShop, owner: ownerDto });
    }

    async findOne(id: number): Promise<ShopResponseDto> {
        const shop = await this.shopsRepository.findOne({
            where: { id },
            relations: ['owner'],
        });
        if (!shop) throw new NotFoundException();
        const ownerDto = new OwnerResponseDto({
            owner_id: shop.owner.id,
            owner_name: `${shop.owner.firstName} ${shop.owner.lastName}`,
            owner_email: shop.owner.email,
        });

        return new ShopResponseDto({ ...shop, owner: ownerDto });
    }

    async remove(id: number) {
        const shop = await this.shopsRepository.findOne({
            where: { id },
            relations: ['owner'],
        });
        if (!shop) throw new NotFoundException();

        await this.shopsRepository.delete(id);
        return "Delete shop " + id + " success";
    }

    //ระหว่างใช้ sqlite
    async findShopsNearby(userLat: number, userLng: number, radiusKm: number) {
        const shops = await this.shopsRepository.find({ relations: ['owner'] });

        const filtered = shops
            .map(shop => {
                const distance = this.getDistanceFromLatLonInKm(userLat, userLng, Number(shop.latitude), Number(shop.longitude));
                return {
                    ...shop, distance_km: parseFloat(distance.toFixed(2))
                };
            })
            .filter(shop => shop.distance_km <= radiusKm)
            .sort((a, b) => a.distance_km - b.distance_km);
            
        return filtered.map(shop => new ShopResponseDto({
            id: shop.id,
            name: shop.name,
            description: shop.description,
            latitude: shop.latitude,
            longitude: shop.longitude,
            phone: shop.phone,
            owner: new OwnerResponseDto({
                owner_id: shop.owner.id,
                owner_name: `${shop.owner.firstName} ${shop.owner.lastName}`,
                owner_email: shop.owner.email,
            }),
            distanceKm: shop.distance_km,
        }));
    }
}
