import { Injectable } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common/enums';
import { HttpException } from '@nestjs/common/exceptions';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Go } from 'src/core/common/response.common';
import { CreateCategoryDTO } from './dto/category.dto';
import { Category, CategoryDocument } from './schema/category.schema';

@Injectable()
export class CategoryService {
    constructor(@InjectModel("Category") private category: Model<CategoryDocument>) { }

    /**
     * 描述
     * @date 2023-02-23
     * @param {any} category:CreateCategoryDTO
     * @returns {any}
     */
    async add(category: CreateCategoryDTO): Promise<Category> {
        try {
            const savedCategory: Category = await this.category.create(category);
            return savedCategory;
        } catch (error) {
            throw new Go().error({
                message: error.message,
                status: HttpStatus.NOT_FOUND,
            });
        }
    }

    /**
     * 描述
     * @date 2023-02-23
     * @returns {any}
     */
    async getAll(): Promise<Category[]> {
        try {
            const categories = await this.category.find({}).select("-_v1");
            return categories;
        } catch (error) {
            throw new Go().error({
                message: error.message,
                status: HttpStatus.NOT_FOUND,
            });
        }
    }

    /**
     * 描述
     * @date 2023-02-23
     * @param {any} id:string
     * @returns {any}
     */
    async delete(id: string): Promise<Category> {
        try {
            const deletedCategory = await this.category.findByIdAndDelete(id);
            return deletedCategory;
        } catch (error) {
            throw new Go().error({
                message: error.message,
                status: HttpStatus.NOT_FOUND,
            });
        }
    }

    /**
     * 描述
     * @date 2023-02-23
     * @param {any} id
     * @param {any} category
     * @returns {any}
     */
    async update({ id, category }: { id: string, category: string }): Promise<Category> {
        try {
            const updatedCategory = await this.category.findByIdAndUpdate(id, { category });
            return updatedCategory;
        } catch (error) {
            throw new Go().error({
                message: error.message,
                status: HttpStatus.NOT_FOUND,
            });
        }
    }

    /**
     * Get Category by ID
     * @date 2023-02-23
     * @param {any} id:string
     * @returns {any}
     */
    async getCategoryById(id: string): Promise<Category> {
        try {
            const category = await this.category.findById(id);
            return category;
        } catch (error) {
            throw new Go().error({
                message: error.message,
                status: HttpStatus.NOT_FOUND,
            });
        }

    }
}

