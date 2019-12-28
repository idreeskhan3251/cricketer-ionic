import { HttpClient, HttpHeaders } from '@angular/common/http';

import { CricketerConfig } from '../cricketer.config';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlayersService {
  constructor(private http: HttpClient) {}

  public getAllPlayers(): Observable<any> {
    const url = CricketerConfig.getPath() + '/players';

    return this.http.get(url);
  }
}
