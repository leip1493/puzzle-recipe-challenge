import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Category } from '../../category/entities/category.entity';
import { WithTimestamps } from '../../shared/entities/with-timestamps.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class Recipe extends WithTimestamps {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  description: string;

  @Field(() => [String], { defaultValue: [] })
  @Column('simple-array')
  ingredients: string[];

  @Field(() => Category)
  @ManyToOne(() => Category, (category) => category.recipes, { eager: true })
  category: Category;
}
