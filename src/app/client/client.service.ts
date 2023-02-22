import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { emailExistsError, Go, passwordNotMatchedError } from 'src/core/common/response.common';
import { Client, ClientDocument } from './schema/client.schema';
import { CreateClientDTO, ClientLoginDTO, ForgetPasswordResponseDTO, ResetPasswordDTO } from "./dto/client.dto"
import { HashPasswordInterceptor } from 'src/core/common/interceptors/hashpassword.interceptor';
import { MailOption } from 'src/core/mailer/dto/mailer.dto';
import { MailerService } from 'src/core/mailer/mailer';
import { forgetPasswordTemplate } from 'src/core/mailer/template/mail.template';
import { generateOTP } from 'src/core/utility/generateOTP';
import { MAILER_EMAIL } from 'env';

@Injectable()
export class ClientService {
  constructor(@InjectModel("Client") private client: Model<ClientDocument>) { }

  private mailer = new MailerService();
  /**
   * Get All Clients
   * @date 2023-02-22
   * @returns {any}
   */
  async getAll(): Promise<Client[]> {
    const clients: Client[] = await this.client.find({});
    if (clients) return clients;
    throw errorOnFetchingClient()
  }

  /**
   * Client Login
   * Checks for client with email
   * Compare pasword
   * @date 2023-02-22
   * @param {any} loginData:ClientLoginDTO
   * @returns {any}
   */
  async login(loginData: ClientLoginDTO): Promise<Client> {
    let email = loginData.email;
    let client = await this.client.findOne({ email });
    if (client) {
      const isValid: boolean = await new HashPasswordInterceptor().validate(
        client.password,
        loginData.password,
      );
      if (isValid) return client;
      throw passwordNotMatchedError();
    }
    throw clientNotFoundError()
  }

  /**
   * Client Signup
   * Checks for email 
   * Send signup succes mail
   * @date 2023-02-22
   * @param {any} signupData:CreateClientDTO
   * @returns {any}
   */
  async signup(signupData: CreateClientDTO): Promise<Client> {
    let email: string = signupData.email;
    let client: Client = await this.client.findOne({ email });
    if (client) emailExistsError(email);
    const createdClient = await this.client.create(signupData);
    const maileConfig: MailOption = {
      from: MAILER_EMAIL,
      html: forgetPasswordTemplate("45620"),
      subject: 'Signup Success',
      to: 'chris.thapa@riddhasoft.com',
    };
    this.mailer.sendMail(maileConfig);
    return createdClient;
  }
  /**
   * Find Client By Id
   * @date 2023-02-22
   * @param {string} id:string
   * @returns {Client}
   */

  async findById(id: string): Promise<Client> {
    const client = await this.client.findById(id)
    if (client) return client;
    throw clientNotFoundError();
  }

  /**
   * Delete Client By Id
   * @date 2023-02-22
   * @param {string} id:string
   * @returns {boolean}
   */
  async deleteById(id: string): Promise<boolean> {
    const deletedClient = await this.client.findByIdAndDelete(id)
    if (deletedClient) return true;
    throw clientNotFoundError();
  }

  /**
   * Forget Password Client
   * Sent Otp to client email
   * @date 2023-02-22
   * @param {string} email:string
   * @returns {ForgetPasswordResponseDTO}
   */
  async forgetPassword(email: string): Promise<ForgetPasswordResponseDTO> {
    const client = await this.client.findOne({ email });
    if (client) {
      let otp: string = generateOTP();
      const maileConfig: MailOption = {
        from: MAILER_EMAIL,
        html: forgetPasswordTemplate(otp),
        subject: 'Forget Password',
        to: email,
      };
      this.mailer.sendMail(maileConfig);
      let response: ForgetPasswordResponseDTO = { otp, email }
      return response;
    }
    throw clientNotFoundError();
  }

  /**
   * 描述
   * @date 2023-02-23
   * @param {ResetPasswordDTO} resetPassword:ResetPasswordDTO
   * @returns {boolean}
   */
  async resetPassword(resetPassword: ResetPasswordDTO): Promise<boolean> {
    const { email, oldpassword, newpassword } = resetPassword;
    const client = await this.client.findOne({ email });
    if (client) {
      const isValid: boolean = await new HashPasswordInterceptor().validate(
        client.password,
        oldpassword
      );
      if (isValid) {
        await this.client.findByIdAndUpdate(client.id, { password: newpassword })
        return true;
      }
      throw passwordNotMatchedError();
    }
    throw clientNotFoundError();
  }
}

/**
 * Client Not Found Exceptions
 * @date 2023-02-22
 * @returns {HttpException}
 */
function clientNotFoundError(): HttpException {
  return new Go().error({
    message: `Client not found`,
    status: HttpStatus.NOT_FOUND,
  })
};

/**
 * Cant get clients
 * @date 2023-02-23
 * @returns {HttpException}
 */
function errorOnFetchingClient(): HttpException {
  return new Go().error({
    message: `Cant fetch Clients`,
    status: HttpStatus.NOT_FOUND,
  });
}