import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Cart, Events } from '../types/event';
import { BehaviorSubject } from 'rxjs';

const ENVENTOFULL = [{id: '',
title: '',
subtitle: '',
image: '',
place: '',
startDate: '',
endDate: '',
description: ''}]

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
  
  private subjectEvents = new BehaviorSubject<Array<Events>>(ENVENTOFULL);
  public totalEvents$ = this.subjectEvents.asObservable();

  constructor(private _httpClient: HttpClient) { }

  getEvents() {
     this._httpClient.get<Events[]>(this.pathEvents).subscribe((data) => {
      data?.sort((a, b) => {return a.startDate.localeCompare(b.startDate)})
        this.subjectEvents.next(data);
     });
}

getEventById(id: string): void {
  const url = `./assets/data/event-info-${id}.json`;
  let eventCart:any
  
  this._httpClient.get<any>(url).subscribe( (data:any) => {
    let session = data.sessions
    let acu = 0
    let cart = JSON.parse(localStorage.getItem('cart')||"[]")
    if(cart.length > 0) {
      const indexCart = cart.findIndex((cartitem:any) => cartitem.id == data.event.id)
      session.map((item:any) => {
        if(indexCart !== -1) {
          cart[indexCart].session.forEach((session:any) => {
            if(item.date === session.date){
              item.availability = session.availability
              item['itemQnt'] = session.itemQnt
              item['id'] = session.id
            }
          })
        }else {
          item.availability = parseInt(item.availability)
          item['itemQnt'] = 0
          item['id'] = acu++
        }
     })
    } else {
      session.map((item:any) => { 
        item.availability = parseInt(item.availability)
        item['itemQnt'] = 0
        item['id'] = acu++
      })

  }
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
