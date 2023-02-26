import { Controller, Post, Res, Body, Get, Delete, Query } from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { CategoryService } from './category.service';
import { CreateCategoryDTO } from './dto/category.dto';
import { Category } from './schema/category.schema';

@ApiTags('Category')
@Controller('category')
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) { }

    @Post('add')
    async addCategory(@Body() categoryData: CreateCategoryDTO) {
        const category: Category = await this.categoryService.add(categoryData);
        return category;
    }

    @Get('all')
    async allCategories(@Res() _res: any): Promise<Category[]> {
        const categories: Category[] = await this.categoryService.getAll();
        return categories;
    }


    @Delete('')
    @ApiQuery({ name: 'id' })
    async deleteCategory(@Query() query: any) {
        let id: string = query.id;
        const deletedCategory: Category = await this.categoryService.delete(id)
        return deletedCategory
    }

    @Get('')
    @ApiQuery({ name: 'id' })
    async getCategory(@Query() query: any) {
        let id: string = query.id;
        const category: Category = await this.categoryService.getCategoryById(id)
        return category
    }

}
