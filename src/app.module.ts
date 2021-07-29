import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryModule } from './category/category.module';
import { RecipeModule } from './recipe/recipe.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'secret',
      database: 'puzzle-recipe',
      synchronize: true,
      autoLoadEntities: true,
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
