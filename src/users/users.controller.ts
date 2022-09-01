import { Metadata, ServerUnaryCall } from '@grpc/grpc-js';
import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { User, UserById } from 'src/_shared/interfaces';
import { Logger } from '@nestjs/common';

@Controller()
export class UsersController {
  private logger = new Logger('UsersController');

  @GrpcMethod('UsersService', 'FindOne')
  findOne(
    data: UserById,
    metadata: Metadata,
    call: ServerUnaryCall<any, any>,
  ): User {
    const items = [
      { id: 1, name: 'John' },
      { id: 2, name: 'Doe' },
    ];
    this.logger.log('Call gRPC method findOne with id: ' + data.id.toString());
    return items.find(({ id }) => id === data.id);
  }
}
