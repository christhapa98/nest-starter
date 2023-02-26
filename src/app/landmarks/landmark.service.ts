import { Injectable } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common/enums';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Go } from 'src/core/common/response.common';
import { CreateLandmarkDTO } from './dto/landmark.dto';
import { Landmark, LandmarkDocument } from './schema/landmark.schema';

@Injectable()
export class LandmarkService {
    constructor(@InjectModel("Landmark") private landmark: Model<LandmarkDocument>) { }

    /**
     * Add Landmark
     * @date 2023-02-24
     * @param {any} landmarkData:CreateLandmarkDTO
     * @returns {any}
     */
    async add(landmarkData: CreateLandmarkDTO): Promise<Landmark> {
        try {
            const landmark = await this.landmark.create(landmarkData);
            return landmark;
        } catch (error) {
            throw new Go().error({
                message: error.message,
                status: HttpStatus.NOT_FOUND,
            });
        }
    }

    /**
     * Get all landmarks
     * @date 2023-02-24
     * @returns {any}
     */
    async getALl(): Promise<Landmark[]> {
        try {
            const allLandmarks: Landmark[] = await this.landmark.find({});
            return allLandmarks;
        } catch (error) {
            throw new Go().error({
                message: error.message,
                status: HttpStatus.NOT_FOUND,
            });
        }
    }

    /**
     * Get landmark by id
     * @date 2023-02-24
     * @param {any} id:string
     * @returns {any}
     */
    async getOne(id: string): Promise<Landmark> {
        try {
            const landmark = await this.landmark.findById(id);
            return landmark;
        } catch (error) {
            throw new Go().error({
                message: error.message,
                status: HttpStatus.NOT_FOUND,
            });
        }
    }

    /**
     * update landmark
     * @date 2023-02-24
     * @param {any} id:string
     * @param {any} landmarkData:any
     * @returns {any}
     */
    async update(id: string, landmarkData: any): Promise<Landmark> {
        try {
            const updatedLandmark = await this.landmark.findByIdAndUpdate(id, { landmarkData });
            return updatedLandmark;
        } catch (error) {
            throw new Go().error({
                message: error.message,
                status: HttpStatus.NOT_FOUND,
            });
        }
    }

    /**
     * Delete landmark by id
     * @date 2023-02-24
     * @param {any} id:string
     * @returns {any}
     */
    async delete(id: string): Promise<boolean> {
        try {
            await this.landmark.findByIdAndDelete(id);
            return true;
        } catch (error) {
            throw new Go().error({
                message: error.message,
                status: HttpStatus.NOT_FOUND,
            });
        }
    }
}
