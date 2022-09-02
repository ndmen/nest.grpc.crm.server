import { Metadata, ServerUnaryCall } from '@grpc/grpc-js';
import { Controller } from '@nestjs/common';
import { GrpcMethod, GrpcStreamMethod } from '@nestjs/microservices';
import { User, UserById } from 'src/_shared/interfaces';
import { Logger } from '@nestjs/common';
import { Observable, Subject } from 'rxjs';

@Controller()
export class UsersController {
  private readonly logger = new Logger('UsersController');
  private readonly users: User[] = [
    { id: 1, name: 'John' },
    { id: 2, name: 'Doe' },
  ];

  @GrpcMethod('UsersService', 'FindOne')
  findOne(
    data: UserById,
    metadata: Metadata,
    call: ServerUnaryCall<any, any>,
  ): User {
    this.logger.log('Call gRPC method findOne with id: ' + data.id.toString());
    return this.users.find(({ id }) => id === data.id);
  }

  @GrpcStreamMethod('UsersService', 'FindMany')
  findMany(data$: Observable<UserById>): Observable<User> {
    const user$ = new Subject<User>();

    const onNext = (userById: UserById) => {
      const user = this.users.find(({ id }) => id === userById.id);
      user$.next(user);
    };
    
    const onComplete = () => user$.complete();

    data$.subscribe({
      next: onNext,
      complete: onComplete,
    });

    this.logger.log('Call gRPC method findMany with id: ' + data$.toString());

    return user$.asObservable();
  }
}
