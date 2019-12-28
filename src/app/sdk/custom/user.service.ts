import { HttpClient, HttpHeaders } from '@angular/common/http';

import { CricketerConfig } from '../cricketer.config';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) {}

  public userLogin(credentials: object): Observable<any> {

    // this url will be http://localhost:3000/users/login
    const url = CricketerConfig.getPath() + '/users/login';

    return this.http.post(url, credentials);
  }
  public userRegister(credentials: object): Observable<any> {
    const url = CricketerConfig.getPath() + '/users/register';

    return this.http.post(url, credentials);
  }
}
