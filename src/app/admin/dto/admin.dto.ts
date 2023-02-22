import { ApiProperty } from '@nestjs/swagger';

export class CreateAdminDTO {
  @ApiProperty()
  readonly name: string;
  @ApiProperty()
  readonly password: string;
  @ApiProperty()
  readonly email: string;
  @ApiProperty()
  readonly image: string;
}

export class LoginAdminDTO {
  @ApiProperty()
  readonly email: string;
  @ApiProperty()
  readonly password: string;
}
