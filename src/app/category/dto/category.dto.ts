import { ApiProperty } from "@nestjs/swagger";

export class CreateCategoryDTO {
    @ApiProperty()
    name: string;
    @ApiProperty()
    icon: string;
}
