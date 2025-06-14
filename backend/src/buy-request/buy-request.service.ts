import { ForbiddenException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateBuyRequestDto } from './dto/create-buy-request.dto';
import { UpdateBuyRequestDto } from './dto/update-buy-request.dto';
import { Repository } from 'typeorm';
import { BuyRequest } from './entities/buy-request.entity';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class BuyRequestService {
  constructor(
    @Inject('BUYREQUEST_REPOSITORY')
    private buyRequestRepo: Repository<BuyRequest>
  ) { }

  async create(createBuyRequestDto: CreateBuyRequestDto, user: User): Promise<BuyRequest> {
    const buyRequest = this.buyRequestRepo.create({
      ...createBuyRequestDto,
      createdBy: user,
    });
    return await this.buyRequestRepo.save(buyRequest);
  }

  async findAll(): Promise<BuyRequest[]> {
    return await this.buyRequestRepo.find({ relations: ['createdBy'] });
  }

  async findOne(id: string): Promise<BuyRequest> {
    const buyRequest = await this.buyRequestRepo.findOne({
      where: { id },
      relations: ['createdBy'],
    });
    if (!buyRequest) {
      throw new NotFoundException(`BuyRequest with id ${id} not found`);
    }
    return buyRequest;
  }

  async update(
    id: string,
    updateDto: UpdateBuyRequestDto,
    user: User,
  ): Promise<BuyRequest> {
    const buyRequest = await this.buyRequestRepo.findOne({
      where: { id },
      relations: ['createdBy'],
    });

    if (!buyRequest) {
      throw new NotFoundException(`BuyRequest with id ${id} not found`);
    }

    if (buyRequest.createdBy.id !== user.id) {
      throw new ForbiddenException(`You are not allowed to update this BuyRequest`);
    }

    Object.assign(buyRequest, updateDto);
    return await this.buyRequestRepo.save(buyRequest);
  }

  async remove(id: string, userId: string): Promise<void> {
    const buyRequest = await this.buyRequestRepo.findOne({
      where: { id }, 
      relations: ['createdBy'],
    });

    if (!buyRequest) {
      throw new NotFoundException(`Buy Request with id ${id} not found`);
    }

    if (buyRequest.createdBy.id !== userId) {
      throw new ForbiddenException('You do not have permission to delete this BuyRequest');
    }

    await this.buyRequestRepo.remove(buyRequest);
  }
}
