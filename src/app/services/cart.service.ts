import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Cart } from '../types/event';
import { ToolsService } from './tools.service';

@Injectable({
  providedIn: 'root',
})
export default class CartService {


  private cart = new BehaviorSubject<Array<Cart> | undefined>(undefined);
  public currentDataCart$ = this.cart.asObservable();
  constructor(private _tools: ToolsService) {

  }


  //Agregamos evento al carrito de compra
  public addCart(newEvent:any){
    let listCart = this.cart.getValue()
    if(listCart){
      const noTicket = newEvent.session.every((item:any) => item.itemQnt === 0)
      let eventIndex = listCart.findIndex( item => item.id === newEvent.id)
      if(noTicket){
        listCart.splice(eventIndex,1)
      }else {
        if(eventIndex !== -1){
          listCart[eventIndex] = newEvent
        }else {
          listCart.push(newEvent)
        }
      }
    }else{
      localStorage.removeItem('cart')
      listCart = []
      listCart.push(newEvent)
    }
    localStorage.setItem('cart', JSON.stringify(listCart))
    this.cart.next(listCart)
  }

  //agregamos un ticket a la sesión
  addTicket(event: Cart, index: number, q: number) {

    if(!event.session[index].availability) {
      return;
    }
   this.updateEvent(event, q+event.session[index].itemQnt, index);
  }
  //Eliminamos de a un ticket
   removeTicket(p: any, index = 0, q:number = 1) {
    this.updateEvent(p, p.session[index].itemQnt - q, index);
  }


  //Actualiza el evento, no deja poner mas ticket del stock y numeros negativos, llama  al metetodo addcart
  updateEvent(event: Cart, value: any, index:number) {

    if (value > event.session[index].availability) {
      event.session[index].itemQnt = event.session[index].availability;
    } else {
      event.session[index].itemQnt = value || 0;
    }
    if (event.session[index].itemQnt < 0) {
      event.session[index].itemQnt = 0;

    }

    this._tools.updateEvent(event)
    const ev = {
      id: event.id,
      title: event.title,
      subtitle: event.subtitle,
      image: event.image,
      session: [event.session[index]],

    }
    this.addCart(event)
  }
}
