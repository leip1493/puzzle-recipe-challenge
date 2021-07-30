import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { RecipeService } from './recipe.service';
import { Recipe } from './entities/recipe.entity';
import { CreateRecipeInput } from './dto/create-recipe.input';
import { UpdateRecipeInput } from './dto/update-recipe.input';
import { GqlAuthGuard } from 'src/auth/guards/gql-auth.guard';
import { UseGuards } from '@nestjs/common';
import { CtxUSer } from 'src/shared/decorators/ctx-user.decorator';
import { User } from 'src/user/entities/user.entity';

@Resolver(() => Recipe)
@UseGuards(GqlAuthGuard)
export class RecipeResolver {
  constructor(private readonly recipeService: RecipeService) {}

  @Mutation(() => Recipe)
  createRecipe(
    @CtxUSer() user: User,
    @Args('createRecipeInput') createRecipeInput: CreateRecipeInput,
  ) {
    return this.recipeService.create(createRecipeInput);
  }

  @Query(() => [Recipe], { name: 'getRecipes' })
  findAll() {
    return this.recipeService.findAll();
  }

  @Query(() => Recipe, { name: 'getOneRecipe', nullable: true })
  findOne(@Args('id', { type: () => ID }) id: string) {
    return this.recipeService.findOne(id);
  }

  @Mutation(() => Recipe)
  updateRecipe(
    @CtxUSer() user: User,
    @Args('updateRecipeInput') updateRecipeInput: UpdateRecipeInput,
  ) {
    return this.recipeService.update(updateRecipeInput.id, updateRecipeInput);
  }

  @Mutation(() => Recipe, { name: 'deleteRecipe' })
  removeRecipe(
    @CtxUSer() user: User,
    @Args('id', { type: () => ID }) id: string,
  ) {
    return this.recipeService.remove(id);
  }
}
