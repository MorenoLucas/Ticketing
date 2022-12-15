import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Events } from '../types/event';

@Injectable({
  providedIn: 'root'
})
export class ToolsService {
  pathEvents:string = './assets/data/events.json'
  constructor(private _httpClient: HttpClient) { }

  getEvents(): Observable<Events[]> {
    return this._httpClient.get<Events[]>(this.pathEvents);
}

getEventById(id: string): Observable<any> {
  const url = `./assets/data/event-info-${id}.json`;
  return this._httpClient.get<any>(url)
}
}
