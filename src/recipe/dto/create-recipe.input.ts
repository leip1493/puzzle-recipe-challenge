import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateRecipeInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
