import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToolsService {
  pathEvents:string = './assets/data/event-info-68.json'
  constructor(private _httpClient: HttpClient) { }

  getEvents(): Observable<any> {
    return this._httpClient.get(this.pathEvents);
}
}
