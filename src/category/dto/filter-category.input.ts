import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class FilterCategoryInput {
  @Field(() => String, { nullable: true })
  name?: string;
}
