import { ApiProperty } from '@nestjs/swagger';

/**
 * New User Object
 * @date 2023-02-22
 * @returns {any}
 */
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

/**
 * Client Login Object
 * @date 2023-02-22
 * @returns {any}
 */
export class ClientLoginDTO {
  @ApiProperty()
  readonly email: string;
  @ApiProperty()
  readonly password: string;
}

/**
 * Forget password Object
 * @date 2023-02-22
 * @returns {any}
 */
export class ForgetPasswordDTO {
  @ApiProperty()
  readonly email: string;
}

/**
 * Forget password response object
 * @date 2023-02-23
 * @param {any} {required:true}
 * @returns {any}
 */
export class ForgetPasswordResponseDTO {
  @ApiProperty({ required: true })
  readonly otp: String;
  @ApiProperty({ required: true })
  readonly email: string;
}

export class ResetPasswordDTO {
  @ApiProperty()
  readonly email: string;
  @ApiProperty({ required: true })
  readonly oldpassword: string;
  @ApiProperty({ required: true })
  readonly newpassword: string;
}