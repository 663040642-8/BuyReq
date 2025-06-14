import { DataSource } from 'typeorm';
import { BuyRequest } from './entities/buy-request.entity';

export const buyRequestProviders = [
  {
    provide: 'BUYREQUEST_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(BuyRequest),
    inject: ['DATA_SOURCE'],
  },
];
