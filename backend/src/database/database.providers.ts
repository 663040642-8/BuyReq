import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import * as path from 'path';

export const databaseProviders = [
    {
        provide: 'DATA_SOURCE',
        inject: [ConfigService],
        useFactory: async (config: ConfigService) => {
            const dataSource = new DataSource({
                type: 'sqlite',
                database: config.get<string>('DB_NAME') || 'db.sqlite',
                entities: [path.join(__dirname, '..', '**', '*.entity.{ts,js}')],
                synchronize: true,
            });
            return dataSource.initialize();
        },
    },
];