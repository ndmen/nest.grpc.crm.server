import { Observable } from 'rxjs';

export interface UsersService {
  FindOne(data: { id: number }): Observable<any>;
  FindMany(upstream: Observable<UserById>): Observable<User>;
}

export interface UserById {
  id: number;
}

export interface User {
  id: number;
  name: string;
}
