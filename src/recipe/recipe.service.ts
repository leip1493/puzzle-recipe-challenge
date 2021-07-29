import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from '../category/entities/category.entity';
import { Repository } from 'typeorm';
import { CreateRecipeInput } from './dto/create-recipe.input';
import { UpdateRecipeInput } from './dto/update-recipe.input';
import { Recipe } from './entities/recipe.entity';

@Injectable()
export class RecipeService {
  constructor(
    @InjectRepository(Recipe)
    private recipeRepository: Repository<Recipe>,
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async create({ categoryId, ...createRecipeInput }: CreateRecipeInput) {
    const category = await this.searchCategory(categoryId);

    const recipe = this.recipeRepository.create({
      ...createRecipeInput,
      category,
    });

    return this.recipeRepository.save(recipe);
  }

  findAll() {
    return this.recipeRepository.find();
  }

  findOne(id: string) {
    return this.recipeRepository.findOne(id);
  }

  async update(
    id: string,
    { categoryId, ...updateRecipeInput }: UpdateRecipeInput,
  ) {
    const recipe = await this.searchRecipe(id);

    const updatedRecipe = { ...recipe, ...updateRecipeInput };

    if (categoryId) {
      const category = await this.searchCategory(categoryId);

      updatedRecipe.category = category;
    }

    return this.recipeRepository.save(updatedRecipe);
  }

  async remove(id: string) {
    const recipe = await this.searchRecipe(id);

    await this.recipeRepository.delete(id);

    return recipe;
  }

  async getRecipesByCategory(categoryId: string): Promise<Recipe[]> {
    return this.recipeRepository.find({ where: { category: categoryId } });
  }

  private async searchCategory(categoryId: string) {
    const category = await this.categoryRepository.findOne(categoryId);

    if (!category) {
      throw new NotFoundException('Category not found');
    }
    return category;
  }
  private async searchRecipe(recipeId: string) {
    const recipe = await this.recipeRepository.findOne(recipeId);

    if (!recipe) {
      throw new NotFoundException('Recipe not found');
    }
    return recipe;
  }
}
