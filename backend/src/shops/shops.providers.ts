import { DataSource } from 'typeorm';
import { Shop } from './entities/shop.entity';

export const shopsProviders = [
  {
    provide: 'SHOPS_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Shop),
    inject: ['DATA_SOURCE'],
  },
];
