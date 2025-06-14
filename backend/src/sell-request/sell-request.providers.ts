import { DataSource } from 'typeorm';
import { SellRequest } from './entities/sell-request.entity';

export const sellRequestProviders = [
  {
    provide: 'SELLREQUEST_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(SellRequest),
    inject: ['DATA_SOURCE'],
  },
];
