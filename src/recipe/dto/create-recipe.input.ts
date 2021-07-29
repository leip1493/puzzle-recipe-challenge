import { InputType, Field, ID } from '@nestjs/graphql';
import { ArrayNotEmpty, IsString, IsUUID, MinLength } from 'class-validator';

@InputType()
export class CreateRecipeInput {
  @IsUUID()
  @Field(() => ID)
  categoryId: string;

  @MinLength(1)
  @Field(() => String)
  name: string;

  @MinLength(1)
  @Field(() => String)
  description: string;

  @ArrayNotEmpty()
  @IsString({ each: true })
  @Field(() => [String])
  ingredients: string[];
}
