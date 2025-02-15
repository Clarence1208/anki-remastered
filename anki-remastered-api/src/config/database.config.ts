import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
    constructor(private configService: ConfigService) {}

    createTypeOrmOptions(): TypeOrmModuleOptions {
        const isProduction = process.env.NODE_ENV === 'production';

        return {
            type: 'postgres',
            host: isProduction ? `/cloudsql/${this.configService.get<string>('DB_INSTANCE_CONNECTION_NAME')}`
                : this.configService.get<string>('DB_HOST'),
            port: isProduction ? undefined : this.configService.get<number>('DB_PORT'),
            username: this.configService.get<string>('DB_USERNAME'),
            password: this.configService.get<string>('DB_PASSWORD'),
            database: this.configService.get<string>('DB_DATABASE'),
            autoLoadEntities: true,
            synchronize: true,
            extra: isProduction
                ? { socketPath: `/cloudsql/${this.configService.get<string>('DB_INSTANCE_CONNECTION_NAME')}` }
                : {},
        };
    }
}
