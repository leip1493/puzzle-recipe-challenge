import { InputType, Field } from '@nestjs/graphql';
import { MinLength } from 'class-validator';

@InputType()
export class CreateCategoryInput {
  @Field(() => String)
  @MinLength(1)
  name: string;
}
