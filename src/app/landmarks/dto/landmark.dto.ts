import { ApiProperty } from "@nestjs/swagger";

/**
 * Create Landmark DTO
 * @date 2023-02-23
 * @returns {any}
 */
export class CreateLandmarkDTO {
    @ApiProperty()
    readonly name: string;
    @ApiProperty()
    readonly address: string;
    @ApiProperty()
    readonly contact: number;
    @ApiProperty()
    readonly image: string;
    @ApiProperty()
    readonly cover?: string;
    @ApiProperty()
    readonly geolocation: number[];
    @ApiProperty()
    readonly tags: [number];
    @ApiProperty()
    readonly category: string;
}