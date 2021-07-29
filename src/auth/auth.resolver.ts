import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { AuthLoginInput } from './dto/auth-login.input';
import { AuthRegisterInput } from './dto/auth-register.input.';
import { UserToken } from './entities/user-token.entity';

@Resolver(() => UserToken)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => UserToken)
  login(
    @Args({ name: 'input', type: () => AuthLoginInput }) input: AuthLoginInput,
  ) {
    return this.authService.login(input);
  }

  @Mutation(() => UserToken)
  register(
    @Args({ name: 'input', type: () => AuthRegisterInput })
    input: AuthRegisterInput,
  ) {
    return this.authService.register(input);
  }
}
