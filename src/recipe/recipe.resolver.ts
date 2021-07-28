import { Resolver, Query, Mutation, Args, Int, ID } from '@nestjs/graphql';
import { RecipeService } from './recipe.service';
import { Recipe } from './entities/recipe.entity';
import { CreateRecipeInput } from './dto/create-recipe.input';
import { UpdateRecipeInput } from './dto/update-recipe.input';

@Resolver(() => Recipe)
export class RecipeResolver {
  constructor(private readonly recipeService: RecipeService) {}

  @Mutation(() => Recipe)
  createRecipe(
    @Args('createRecipeInput') createRecipeInput: CreateRecipeInput,
  ) {
    return this.recipeService.create(createRecipeInput);
  }

  @Query(() => [Recipe], { name: 'getRecipes' })
  findAll() {
    return this.recipeService.findAll();
  }

  @Query(() => Recipe, { name: 'getOneRecipe' })
  findOne(@Args('id', { type: () => ID }) id: string) {
    return this.recipeService.findOne(id);
  }

  @Mutation(() => Recipe)
  updateRecipe(
    @Args('updateRecipeInput') updateRecipeInput: UpdateRecipeInput,
  ) {
    return this.recipeService.update(updateRecipeInput.id, updateRecipeInput);
  }

  @Mutation(() => Recipe, { name: 'deleteRecipe' })
  removeRecipe(@Args('id', { type: () => ID }) id: string) {
    return this.recipeService.remove(id);
  }
}
