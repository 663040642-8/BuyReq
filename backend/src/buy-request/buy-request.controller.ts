import { Controller, Get, Post, Body, Param, Delete, UseGuards, Put, Patch } from '@nestjs/common';
import { BuyRequestService } from './buy-request.service';
import { CreateBuyRequestDto } from './dto/create-buy-request.dto';
import { UpdateBuyRequestDto } from './dto/update-buy-request.dto';
import { User } from 'src/users/decorators/user.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { JwtPayload } from 'src/auth/interfaces/jwt-payload.interface';
import { UsersService } from 'src/users/users.service';
import { BuyRequestResponseDto } from './dto/buy-request-response.dto';

@Controller('buy-request')
export class BuyRequestController {
  constructor(
    private readonly buyRequestService: BuyRequestService,
    private readonly usersService: UsersService
  ) { }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Body() createBuyRequestDto: CreateBuyRequestDto,
    @User() payload: JwtPayload,
  ): Promise<BuyRequestResponseDto> {
    const user = await this.usersService.findById(payload.sub);
    const entity = await this.buyRequestService.create(createBuyRequestDto, user);
    return new BuyRequestResponseDto(entity);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<BuyRequestResponseDto> {
    const entity = await this.buyRequestService.findOne(id);
    return new BuyRequestResponseDto(entity);
  }

  @Get()
  async findAll(): Promise<BuyRequestResponseDto[]> {
    const entities = await this.buyRequestService.findAll();
    return entities.map(entity => new BuyRequestResponseDto(entity));
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateDto: UpdateBuyRequestDto,
    @User() payload: JwtPayload,
  ): Promise<BuyRequestResponseDto> {
    const user = await this.usersService.findById(payload.sub);
    const entity = await this.buyRequestService.update(id, updateDto, user);
    return new BuyRequestResponseDto(entity);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(
    @Param('id') id: string,
    @User() payload: JwtPayload,
  ): Promise<{ message: string }> {
    await this.buyRequestService.remove(id, payload.sub);
    return { message: 'Delete Success' };
  }
}
