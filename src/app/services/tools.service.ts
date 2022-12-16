import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Cart, Events } from '../types/event';
import { BehaviorSubject } from 'rxjs';

const EVENTO: Cart = {
id: '',
title: '',
subtitle: '',
image: '',
session: [{
    id: 0,
    itemQnt: 0,
    date: 'string',
    availability: 0,
}]}
@Injectable({
  providedIn: 'root'
})
export class ToolsService {
  pathEvents:string = './assets/data/events.json'

  private subject = new BehaviorSubject<Cart>(EVENTO);
  public artistSession$ = this.subject.asObservable();

  constructor(private _httpClient: HttpClient) { }

  getEvents() {
    return this._httpClient.get<Events[]>(this.pathEvents);
}

getEventById(id: string): void {
  const url = `./assets/data/event-info-${id}.json`;
  let eventCart:any
  this._httpClient.get<any>(url).subscribe( (data:any) => {
    let session = data.sessions
    session.map((item:any) => { 
      item.availability = parseInt(item.availability)
      item['itemQnt'] = 0
    })
    eventCart = {
        id: data.event.id,
        title: data.event.title,
        image: data.event.image,
        subtitle: data.event.subtitle,
        session: session 
    }
      eventCart?.session.sort((a:any, b:any) => {return a.date.localeCompare(b.date)})
      this.subject.next(eventCart)
    })
  }

  updateEvent(event: Cart){
    console.log(event);
   let  eventCart = {
      id: event.id,
      title: event.title,
      image: event.image,
      subtitle: event.subtitle,
      session: event.session 
  }
    eventCart?.session.sort((a:any, b:any) => {return a.date.localeCompare(b.date)})
    this.subject.next(eventCart)
  }
}
