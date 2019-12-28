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
  public addPlayer(data: object): Observable<any> {
    const url = CricketerConfig.getPath() + '/players/add';

    return this.http.post(url, data);
  }
  public updatePlayer(data): Observable<any> {
    console.log('datadata', data);
    const url = CricketerConfig.getPath() + `/books/${data._id}`;
    return this.http.put(url, data);
  }
  public deletePlayer(id: string): Observable<any> {
    const url = CricketerConfig.getPath() + `/players/${id}`;
    return this.http.delete(url);
  }
}
