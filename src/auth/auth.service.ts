import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { AuthLoginInput } from './dto/auth-login.input';
import { AuthRegisterInput } from './dto/auth-register.input.';
import { UserToken } from './entities/user-token.entity';
import { AuthHelper } from './auth-helper';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async login(input: AuthLoginInput): Promise<UserToken> {
    const user = await this.userRepository.findOne({
      where: { email: input.email },
    });

    if (!user) {
      throw new NotFoundException(
        `User with email ${input.email} does not exists`,
      );
    }

    const isPasswordValid = await AuthHelper.validate(
      input.password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new BadRequestException('Invalid password');
    }

    return {
      user,
      token: this.signToken(user.id),
    };
  }

  async register(input: AuthRegisterInput): Promise<UserToken> {
    const userWithEmail = await this.userRepository.findOne({
      where: { email: input.email },
    });

    if (userWithEmail) {
      throw new BadRequestException(`Email ${input.email} already taken.`);
    }

    const password = await AuthHelper.hash(input.password);

    const createdUser = this.userRepository.create({
      ...input,
      password,
    });

    await this.userRepository.save(createdUser);

    return {
      user: createdUser,
      token: this.signToken(createdUser.id),
    };
  }

  public validateUser(userId: string) {
    return this.userRepository.findOne(userId);
  }

  private signToken(id: string) {
    const payload = { userId: id };
    return this.jwtService.sign(payload);
  }
}
