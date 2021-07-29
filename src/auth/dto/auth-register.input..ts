import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class AuthRegisterInput {
  @Field()
  email: string;

  @Field()
  fullname: string;

  @Field()
  password: string;
}
