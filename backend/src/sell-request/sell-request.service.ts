import { ForbiddenException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateSellRequestDto } from './dto/create-sell-request.dto';
import { UpdateSellRequestDto } from './dto/update-sell-request.dto';
import { BuyRequest } from 'src/buy-request/entities/buy-request.entity';
import { Repository } from 'typeorm';
import { SellRequest } from './entities/sell-request.entity';
import { User } from 'src/users/entities/user.entity';
import { SellRequestResponseDto } from './dto/sell-request-response.dto';

@Injectable()
export class SellRequestService {
  constructor(
    @Inject('BUYREQUEST_REPOSITORY')
    private buyRequestRepos: Repository<BuyRequest>,
    @Inject('SELLREQUEST_REPOSITORY')
    private sellRequestRepo: Repository<SellRequest>
  ) { }

  async create(createSellRequestDto: CreateSellRequestDto, user: User): Promise<SellRequest> {
    const buyRequest = await this.buyRequestRepos.findOne({ where: { id: createSellRequestDto.buyRequestId } });
    if (!buyRequest) {
      throw new NotFoundException(`BuyRequest with id ${createSellRequestDto.buyRequestId} not found`);
    }

    const sellRequest = this.sellRequestRepo.create({
      ...createSellRequestDto,
      buyRequest,
      seller: user,
    });

    return await this.sellRequestRepo.save(sellRequest);
  }

  async findAll(): Promise<SellRequest[]> {
    return await this.sellRequestRepo.find({ relations: ['seller', 'buyRequest'], });
  }

  async findOne(id: string): Promise<SellRequest> {
    const sellRequest = await this.sellRequestRepo.findOne({
      where: { id },
      relations: ['seller', 'buyRequest'],
    });

    if (!sellRequest) {
      throw new NotFoundException(`SellRequest with id ${id} not found`);
    }

    return sellRequest;
  }

  async update(
    id: string,
    updateDto: UpdateSellRequestDto,
    user: User,
  ): Promise<SellRequest> {
    const sellRequest = await this.sellRequestRepo.findOne({
      where: { id },
      relations: ['seller', 'buyRequest'],
    });

    if (!sellRequest) {
      throw new NotFoundException(`SellRequest with id ${id} not found`);
    }

    if (sellRequest.seller.id !== user.id) {
      throw new ForbiddenException(`You are not allowed to update this SellRequest`);
    }

    Object.assign(sellRequest, updateDto);
    return await this.sellRequestRepo.save(sellRequest);
  }

  async remove(id: string, userId: string): Promise<void> {
    const sellRequest = await this.sellRequestRepo.findOne({
      where: { id },
      relations: ['seller'],
    });

    if (!sellRequest) {
      throw new NotFoundException(`Sell Request with id ${id} not found`);
    }

    if (sellRequest.seller.id !== userId) {
      throw new ForbiddenException('You do not have permission to delete this SellRequest');
    }

    await this.sellRequestRepo.remove(sellRequest);
  }
}
