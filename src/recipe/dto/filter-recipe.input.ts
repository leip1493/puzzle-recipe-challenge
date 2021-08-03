import { InputType, Field, ID } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';

@InputType()
export class FilterRecipeInput {
  @Field(() => ID, { nullable: true })
  categoryId?: string;

  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => String, { nullable: true })
  ingredient?: string;
}
