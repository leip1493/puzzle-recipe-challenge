import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { CategoryModule } from './category/category.module';
import configuration from './config/configuration';
import { EnviromentVariables } from './config/enviroment-variables.interface';
import { RecipeModule } from './recipe/recipe.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      envFilePath: '.env',
      expandVariables: true,
      load: [configuration],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (
        configService: ConfigService<EnviromentVariables>,
      ) => ({
        ssl: true,
        extra: {
          ssl: { rejectUnauthorized: false },
        },
        type: 'postgres',
        host: configService.get('database.host'),
        port: configService.get('database.port'),
        username: configService.get('database.username'),
        password: configService.get('database.password'),
        database: configService.get('database.name'),
        synchronize: true,
        autoLoadEntities: true,
      }),
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: true,
    }),
    CategoryModule,
    RecipeModule,
    UserModule,
    AuthModule,
  ],
})
export class AppModule {}
