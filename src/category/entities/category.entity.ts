import { ObjectType, Field, ID } from '@nestjs/graphql';
import { WithTimestamps } from '../../shared/entities/with-timestamps.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Recipe } from '../../recipe/entities/recipe.entity';

@ObjectType()
@Entity()
export class Category extends WithTimestamps {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column({ unique: true })
  name: string;

  @Field(() => [Recipe], { defaultValue: [] })
  @OneToMany(() => Recipe, (recipe) => recipe.category)
  recipes: Recipe[];
}
