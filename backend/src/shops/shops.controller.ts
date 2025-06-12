import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards, Req, UnauthorizedException, ParseIntPipe, Query } from '@nestjs/common';
import { ShopsService } from './shops.service';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreateShopDto } from './dto/create-shop.dto';
import { UpdateShopDto } from './dto/update-shop.dto';
import { Request } from 'express';
import { JwtPayload } from 'src/auth/interfaces/jwt-payload.interface';

@Controller('shops')
export class ShopsController {
    constructor(private readonly shopsService: ShopsService) { }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin', 'shop_owner')
    @Post()
    create(@Body() dto: CreateShopDto, @Req() req: Request) {
        const user = req.user as JwtPayload;
        return this.shopsService.create(dto, user.sub);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin', 'shop_owner')
    // @Get()
    // findAll(
    //     @Query('lat') lat?: string,
    //     @Query('lng') lng?: string,
    //     @Query('radius') radius?: string,
    // ) {
    //     return this.shopsService.findAll(
    //         lat ? parseFloat(lat) : undefined,
    //         lng ? parseFloat(lng) : undefined,
    //         radius ? parseFloat(radius) : 10,
    //     );
    // }
    @Get()
    async findAll(
        @Query('lat') lat?: string,
        @Query('lng') lng?: string,
        @Query('radius') radius?: string,
    ) {
        if (!lat || !lng) {
            return this.shopsService.findAll();
        }

        const userLat = parseFloat(lat);
        const userLng = parseFloat(lng);
        const radiusKm = radius ? parseFloat(radius) : 10;

        return this.shopsService.findShopsNearby(userLat, userLng, radiusKm);
    }


    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin', 'shop_owner')
    @Get(':id')
    getOne(@Param('id', ParseIntPipe) id: number) {
        return this.shopsService.getShopById(id);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin', 'shop_owner')
    @Patch(':id')
    update(@Param('id') id: string, @Body() dto: UpdateShopDto) {
        return this.shopsService.update(+id, dto);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin', 'shop_owner')
    @Delete(':id')
    async remove(@Param('id') id: string) {
        return this.shopsService.remove(+id);
    }

}
