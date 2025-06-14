import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { SellRequestService } from './sell-request.service';
import { CreateSellRequestDto } from './dto/create-sell-request.dto';
import { UpdateSellRequestDto } from './dto/update-sell-request.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

import { JwtPayload } from 'src/auth/interfaces/jwt-payload.interface';
import { User } from 'src/users/decorators/user.decorator';
import { UsersService } from 'src/users/users.service';
import { SellRequestResponseDto } from './dto/sell-request-response.dto';

@Controller('sell-request')
export class SellRequestController {
  constructor(
    private readonly sellRequestService: SellRequestService,
    private readonly usersService: UsersService
  ) { }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Body() createSellRequestDto: CreateSellRequestDto,
    @User() payload: JwtPayload,
  ): Promise<SellRequestResponseDto> {
    const user = await this.usersService.findById(payload.sub);
    const entity = await this.sellRequestService.create(createSellRequestDto, user);
    return new SellRequestResponseDto(entity);
  }

  @Get()
  async findAll(): Promise<SellRequestResponseDto[]> {
    const entities = await this.sellRequestService.findAll();
    return entities.map(entity => new SellRequestResponseDto(entity));
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<SellRequestResponseDto> {
    const entity = await this.sellRequestService.findOne(id);
    return new SellRequestResponseDto(entity);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateDto: UpdateSellRequestDto,
    @User() payload: JwtPayload,
  ): Promise<SellRequestResponseDto> {
    const user = await this.usersService.findById(payload.sub);
    const entity = await this.sellRequestService.update(id, updateDto, user);
    return new SellRequestResponseDto(entity);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(
    @Param('id') id: string,
    @User() payload: JwtPayload,
  ): Promise<{ message: string }> {
    await this.sellRequestService.remove(id, payload.sub);
    return { message: 'Delete Success' };
  }
}
