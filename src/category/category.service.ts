import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { CreateCategoryInput } from './dto/create-category.input';
import { FilterCategoryInput } from './dto/filter-category.input';
import { UpdateCategoryInput } from './dto/update-category.input';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  create(createCategoryInput: CreateCategoryInput) {
    const category = this.categoryRepository.create(createCategoryInput);

    return this.categoryRepository.save(category);
  }

  findAll(filterCategoryInput: FilterCategoryInput) {
    const query: any = this.buildCategoryQuery(filterCategoryInput);

    return this.categoryRepository.find(query);
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

  private buildCategoryQuery(filterCategoryInput: FilterCategoryInput) {
    const query: any = {
      where: {},
    };

    if (filterCategoryInput?.name) {
      query.where.name = Like(`%${filterCategoryInput.name}%`);
    }
    return query;
  }
}
