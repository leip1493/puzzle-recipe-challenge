import { InputType, Field, ID } from '@nestjs/graphql';

@InputType()
export class FilterRecipeInput {
  @Field(() => ID, { nullable: true })
  categoryId?: string;

  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => String, { nullable: true })
  ingredient?: string;
}
