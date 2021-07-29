import { Field, ObjectType } from '@nestjs/graphql';
import { User } from 'src/user/entities/user.entity';

@ObjectType()
export class UserToken {
  @Field()
  token: string;

  @Field(() => User)
  user: User;
}
