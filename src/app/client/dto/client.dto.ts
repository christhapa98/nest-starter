import { ApiProperty } from "@nestjs/swagger";

export class CreateClientDTO {
    @ApiProperty()
    readonly name: string;
    @ApiProperty()
    readonly email: string;
    @ApiProperty()
    readonly password: string;
    @ApiProperty()
    readonly contact: number;
    @ApiProperty()
    readonly logo: string;
}

export class ClientLoginDTO {
    @ApiProperty()
    readonly email: string;
    @ApiProperty()
    readonly password: string;
}
