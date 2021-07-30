import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from '../category/entities/category.entity';
import { Repository } from 'typeorm';
import { CreateRecipeInput } from './dto/create-recipe.input';
import { UpdateRecipeInput } from './dto/update-recipe.input';
import { Recipe } from './entities/recipe.entity';
import { User } from '../user/entities/user.entity';

@Injectable()
export class RecipeService {
  constructor(
    @InjectRepository(Recipe)
    private recipeRepository: Repository<Recipe>,
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(
    userId: string,
    { categoryId, ...createRecipeInput }: CreateRecipeInput,
  ) {
    const category = await this.searchCategory(categoryId);

    const user = await this.userRepository.findOne(userId);

    const recipe = this.recipeRepository.create({
      ...createRecipeInput,
      category,
      user,
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
    userId: string,
    { categoryId, ...updateRecipeInput }: UpdateRecipeInput,
  ) {
    const recipe = await this.searchRecipe(id);

    if (recipe.user.id !== userId) {
      throw new ForbiddenException('The recipe does not belong to you');
    }

    const updatedRecipe = { ...recipe, ...updateRecipeInput };

    if (categoryId) {
      const category = await this.searchCategory(categoryId);

      updatedRecipe.category = category;
    }

    return this.recipeRepository.save(updatedRecipe);
  }

  async remove(id: string, userId: string) {
    const recipe = await this.searchRecipe(id);

    if (recipe.user.id !== userId) {
      throw new ForbiddenException('The recipe does not belong to you');
    }

    await this.recipeRepository.delete(id);

    return recipe;
  }

  async getRecipesByCategory(categoryId: string): Promise<Recipe[]> {
    return this.recipeRepository.find({ where: { category: categoryId } });
  }

  async getRecipesByUser(userId: string): Promise<Recipe[]> {
    return this.recipeRepository.find({ where: { user: userId } });
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
