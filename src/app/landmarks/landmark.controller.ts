import { Controller, Post } from '@nestjs/common';
import { Body, Delete, Get, Query, Res } from '@nestjs/common/decorators';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { CreateLandmarkDTO } from './dto/landmark.dto';
import { LandmarkService } from './landmark.service';
import { Landmark } from './schema/landmark.schema';

@ApiTags('Landmark')
@Controller('landmark')
export class LandmarkController {
    constructor(private readonly landmarkService: LandmarkService) { }

    /**
     * Add Landmark
     * @date 2023-02-24
     * @param {any} 'add'
     * @returns {any}
     */
    @Post('add')
    async addLandmark(@Res() res: any, @Body() landmarkData: CreateLandmarkDTO): Promise<Landmark> {
        const landmark: Landmark = await this.landmarkService.add(landmarkData)
        return landmark
    }

    /**
     * Get All Landmarks
     * @date 2023-02-24
     * @param {any} 'all'
     * @returns {any}
     */
    @Get('all')
    async getAll(@Res() res: any) {
        const allLandmarks = await this.landmarkService.getALl();
        return allLandmarks
    }

    /**
     * Get Single Landmark
     * @date 2023-02-24
     * @param {any} ":id"
     * @returns {any}
     */
    @Get("")
    @ApiQuery({ name: 'id' })
    async getLandmarkById(@Res() res: any, @Query() query: any) {
        let id = query.id;
        const landmark = await this.landmarkService.getOne(id);
        return landmark
    }

    /**
     * Delete a landmark
     * @date 2023-02-24
     * @param {any} ":id"
     * @returns {any}
     */
    @Delete("")
    @ApiQuery({ name: 'id' })
    async deleteLandmark(@Res() res: any, @Query() query: any) {
        let id = query.id;
        const deleted = await this.landmarkService.delete(id);
        return deleted;
    }

    /**
     * Update Landmark
     * @date 2023-02-24
     * @param {any} "update/:id"
     * @returns {any}
     */
    @Post("update")
    @ApiQuery({ name: 'id' })
    async updateLandmark(@Res() res: any, @Query() query: any, @Body() landmarkData: any): Promise<any> {
        let id = query.id;
        const updatedLandmark = await this.landmarkService.update(id, landmarkData);
        return updatedLandmark;
    }
}
