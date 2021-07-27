import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCategoryInput } from './dto/create-category.input';
import { UpdateCategoryInput } from './dto/update-category.input';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  create(createCategoryInput: CreateCategoryInput) {
    const category = this.categoryRepository.create({
      ...createCategoryInput,
      createdAt: new Date(),
    });

    return this.categoryRepository.save(category);
  }

  findAll() {
    return this.categoryRepository.find();
  }

  findOne(id: string) {
    return this.categoryRepository.findOne(id);
  }

  async update(id: string, updateCategoryInput: UpdateCategoryInput) {
    const category = await this.searchCategory(id);

    const updatedCategory = { ...category, ...updateCategoryInput };

    return this.categoryRepository.save(updatedCategory);
  }

  async remove(id: string) {
    const category = await this.searchCategory(id);

    await this.categoryRepository.delete(id);

    return category;
  }

  private async searchCategory(id: string) {
    const category = await this.categoryRepository.findOne(id);
    if (!category) {
      throw new NotFoundException('Category not found');
    }
    return category;
  }
}
