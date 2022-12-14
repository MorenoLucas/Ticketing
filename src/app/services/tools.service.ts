import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToolsService {
  pathEvents:string = './assets/data/events.json'
  constructor(private _httpClient: HttpClient) { }

  getEvents(): Observable<Event[]> {
    return this._httpClient.get<Event[]>(this.pathEvents);
}

getEventById(id: string): Observable<any> {
  const url = `./assets/data/event-info-${id}.json`;
  return this._httpClient.get<any>(url)
}
}
