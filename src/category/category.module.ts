import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryResolver } from './category.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Recipe } from '../recipe/entities/recipe.entity';
import { RecipeModule } from 'src/recipe/recipe.module';

@Module({
  imports: [TypeOrmModule.forFeature([Category, Recipe]), RecipeModule],
  providers: [CategoryResolver, CategoryService],
})
export class CategoryModule {}
