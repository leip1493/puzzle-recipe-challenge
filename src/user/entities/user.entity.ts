import { ObjectType, Field, ID, HideField } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { WithTimestamps } from '../../shared/entities/with-timestamps.entity';

@Entity()
@ObjectType()
export class User extends WithTimestamps {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field(() => String)
  @Column()
  email: string;

  @Field(() => String)
  @Column()
  fullname: string;

  @HideField()
  @Column()
  password: string;
}
