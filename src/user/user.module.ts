import { Module } from '@nestjs/common';
import { RecipeModule } from 'src/recipe/recipe.module';
import { UserResolver } from './user.resolver';

@Module({
  imports: [RecipeModule],
  providers: [UserResolver],
})
export class UserModule {}
