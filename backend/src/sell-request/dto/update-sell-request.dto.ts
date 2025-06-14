import { PartialType } from '@nestjs/mapped-types';
import { CreateSellRequestDto } from './create-sell-request.dto';

export class UpdateSellRequestDto extends PartialType(CreateSellRequestDto) {}
