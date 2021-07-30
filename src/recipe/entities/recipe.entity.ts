import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Category } from '../../category/entities/category.entity';
import { WithTimestamps } from '../../shared/entities/with-timestamps.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from 'src/user/entities/user.entity';

@ObjectType()
@Entity()
export class Recipe extends WithTimestamps {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field(() => String)
  @Column()
  name: string;

  @Field(() => String)
  @Column()
  description: string;

  @Field(() => [String], { defaultValue: [] })
  @Column('simple-array')
  ingredients: string[];

  @Field(() => Category)
  @ManyToOne(() => Category, (category) => category.recipes, { eager: true })
  category: Category;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.recipes, { eager: true })
  user: User;
}
