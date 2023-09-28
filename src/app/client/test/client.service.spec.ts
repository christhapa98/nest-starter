import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus } from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Go } from 'src/core/common/response.common';
import { ClientService } from '../client.service';
import { ClientDocument } from '../schema/client.schema';
import { ClientLoginDTO } from '../dto/client.dto';
import { HashPasswordInterceptor } from 'src/core/common/interceptors/hashpassword.interceptor';

describe('ClientService', () => {
    let service: ClientService;
    let clientModel: Model<ClientDocument>;

    const mockClient: any = {
        _id: '6101a44ee10b9e43d84d8a3c',
        name: 'John Doe',
        email: 'johndoe@example.com',
        password: 'password123',
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ClientService,
                {
                    provide: getModelToken('Client'),
                    useValue: {
                        find: jest.fn().mockResolvedValue([mockClient]),
                        findOne: jest.fn().mockResolvedValue(mockClient),
                        create: jest.fn().mockResolvedValue(mockClient),
                    },
                },
            ],
        }).compile();

        service = module.get<ClientService>(ClientService);
        clientModel = module.get<Model<ClientDocument>>(getModelToken('Client'));
    });

    describe('getAll', () => {
        it('should return an array of clients', async () => {
            const result = await service.getAll();
            expect(result).toEqual([mockClient]);
            expect(clientModel.find).toHaveBeenCalled();
        });

        it('should throw a Go error if no clients found', async () => {
            jest.spyOn(clientModel, 'find').mockResolvedValueOnce([]);
            await expect(service.getAll()).rejects.toThrowError(
                new Go().error({
                    message: 'Cant fetch Clients',
                    status: HttpStatus.NOT_FOUND,
                }),
            );
        });
    });

    describe('login', () => {
        const mockLoginData: ClientLoginDTO = {
            email: 'johndoe@example.com',
            password: 'password123',
        };

        it('should return the client if login is successful', async () => {
            const result = await service.login(mockLoginData);
            expect(result).toEqual(mockClient);
            expect(clientModel.findOne).toHaveBeenCalledWith({
                email: mockLoginData.email,
            });
            expect(
                new HashPasswordInterceptor().validate,
            ).toHaveBeenCalledWith(mockClient.password, mockLoginData.password);
        });

        it('should throw a Go error if no client found', async () => {
            jest.spyOn(clientModel, 'findOne').mockResolvedValueOnce(null);
            await expect(service.login(mockLoginData)).rejects.toThrowError(
                new Go().error({
                    message: `User with ${mockLoginData.email} not found`,
                    status: HttpStatus.NOT_FOUND,
                }),
            );
        });

        it('should throw a Go error if password is incorrect', async () => {
            jest.spyOn(new HashPasswordInterceptor(), 'validate').mockResolvedValueOnce(false);
            await expect(service.login(mockLoginData)).rejects.toThrowError(
                new Go().error({
                    message: 'Password doesnot matched',
                    status: HttpStatus.FORBIDDEN,
                }),
            );
        });
    });
})