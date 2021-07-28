import { Injectable } from '@nestjs/common';
import { CreateRecipeInput } from './dto/create-recipe.input';
import { UpdateRecipeInput } from './dto/update-recipe.input';

@Injectable()
export class RecipeService {
  create(createRecipeInput: CreateRecipeInput) {
    return 'This action adds a new recipe';
  }

  findAll() {
    return [];
  }

  findOne(id: string) {
    return `This action returns a #${id} recipe`;
  }

  update(id: string, updateRecipeInput: UpdateRecipeInput) {
    return `This action updates a #${id} recipe`;
  }

  remove(id: string) {
    return `This action removes a #${id} recipe`;
  }
}
