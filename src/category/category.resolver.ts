import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  ID,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { CategoryService } from './category.service';
import { Category } from './entities/category.entity';
import { CreateCategoryInput } from './dto/create-category.input';
import { UpdateCategoryInput } from './dto/update-category.input';
import { RecipeService } from '../recipe/recipe.service';
import { Recipe } from 'src/recipe/entities/recipe.entity';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';

@Resolver(() => Category)
@UseGuards(GqlAuthGuard)
export class CategoryResolver {
  constructor(
    private readonly categoryService: CategoryService,
    private readonly recipeService: RecipeService,
  ) {}

  @Mutation(() => Category)
  createCategory(
    @Args('createCategoryInput') createCategoryInput: CreateCategoryInput,
  ) {
    return this.categoryService.create(createCategoryInput);
  }

  @Query(() => [Category], { name: 'getCategories' })
  findAll() {
    return this.categoryService.findAll();
  }

  @Query(() => Category, { name: 'getOneCategory', nullable: true })
  findOne(@Args('id', { type: () => ID }) id: string) {
    return this.categoryService.findOne(id);
  }

  @Mutation(() => Category)
  updateCategory(
    @Args('updateCategoryInput') updateCategoryInput: UpdateCategoryInput,
  ) {
    return this.categoryService.update(
      updateCategoryInput.id,
      updateCategoryInput,
    );
  }

  @Mutation(() => Category, { name: 'deleteCategory' })
  removeCategory(@Args('id', { type: () => ID }) id: string) {
    return this.categoryService.remove(id);
  }

  @ResolveField(() => [Recipe], { defaultValue: [] })
  async recipes(@Parent() category: Category) {
    return this.recipeService.getRecipesByCategory(category.id);
  }
}
