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

  /*
  * Pide todos los eventos a la api
  */
  getEvents() {
     this._httpClient.get<Events[]>(this.pathEvents).subscribe((data) => {
      data?.sort((a, b) => {return a.endDate.localeCompare(b.endDate)})
        this.subjectEvents.next(data);
     });
}
/*
  * Pide evento por id, y agrega propiedades, y actualiza si existe carrito
  */
getEventById(id: string): void {
  const url = `./assets/data/event-info-${id}.json`;
  let eventCart:any
  
  this._httpClient.get<any>(url).subscribe( {
    next:(data:any) => {
    let session = data.sessions
    let acu = 0
    let cart = JSON.parse(localStorage.getItem('cart')||"[]")
    session.map((item:any) => { 
      item.availability = parseInt(item.availability)
      item['itemQnt'] = 0
      item['id'] = acu++
    })
    if(cart.length > 0) {
      const indexCart = cart.findIndex((cartitem:any) => cartitem.id == data.event.id)
      ///si existe recorro todas las sesiones
      if(indexCart !== -1) {
      session.map((item:any) => {
        const index = cart[indexCart].session.findIndex((ss:any) => ss.id == item.id)
            if(index != -1){
              item.availability = cart[indexCart].session[index].availability
              item['itemQnt'] = cart[indexCart].session[index].itemQnt
              item['id'] = session.id
            }
        })
      }
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
    },
    error: (error: any) => {
      this.subject.next(EVENTO)

    }
  })
  }
  /*
  * Actualiza el evento 
  */
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
