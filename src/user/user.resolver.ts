import { Resolver, ResolveField, Parent } from '@nestjs/graphql';
import { Recipe } from 'src/recipe/entities/recipe.entity';
import { RecipeService } from 'src/recipe/recipe.service';

import { User } from 'src/user/entities/user.entity';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly recipeService: RecipeService) {}

  @ResolveField(() => [Recipe], { defaultValue: [] })
  async recipes(@Parent() user: User) {
    return this.recipeService.getRecipesByUser(user.id);
  }
}
