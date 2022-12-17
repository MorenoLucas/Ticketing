import { Injectable } from '@angular/core';
import { Session } from 'inspector';
import { BehaviorSubject, Subject } from 'rxjs';
import { Cart } from '../types/event';
import { ToolsService } from './tools.service';

@Injectable({
  providedIn: 'root',
})
export default class CartService {
  
 
  private cart = new BehaviorSubject<Array<Cart>>([]); 
  public currentDataCart$ = this.cart.asObservable(); 
  constructor(private _tools: ToolsService) {

  }


  //Agregamos evento al carrito de compra
  public addCart(newEvent:any){
    let listCart = this.cart.getValue()
    if(listCart){
      let eventIndex = listCart.findIndex( item => item.id === newEvent.id)
      if(eventIndex !== -1){
        let sesionIndex = listCart[eventIndex].session.findIndex( (item:any) => item.date == newEvent.session[0].date)
        if(sesionIndex !== -1){
          listCart[eventIndex].session[sesionIndex] = newEvent.session[0]
        }else{
          listCart[eventIndex].session.push(newEvent.session[0])
        }
      }else {
        listCart.push(newEvent)
      }
    }else{
      localStorage.removeItem('cart')
      listCart = []
      listCart.push(newEvent)
    }
    localStorage.setItem('cart', JSON.stringify(listCart))
    this.cart.next(listCart)
  }

  //Eliminamos elemento del carrito
  public removeElementCart(newEvent:any, id:string){
    //Obtenemos el valor actual de carrito
    let listCart = this.cart.getValue();
    //Buscamos el item del carrito para eliminar
    let eventIndex = listCart.findIndex((item => item.id == id));
    if(eventIndex != -1)
    {
      let sesionIndex = listCart[eventIndex].session.findIndex( (item:any) => item.date == newEvent.date)
      if(sesionIndex !== -1){
        if(listCart[eventIndex].session[sesionIndex].itemQnt > 0){
          listCart[eventIndex].session[sesionIndex].itemQnt -= 1       
          if(listCart[eventIndex].session[sesionIndex].itemQnt == 0){
             listCart[eventIndex].session.splice(sesionIndex, 1);
             if(listCart[eventIndex].session.length < 1 ){
              // this._tools.getEventById(listCart[eventIndex].id)
              listCart.splice(eventIndex, 1);
            }
          }
        } 
        listCart.length > 0 ? localStorage.setItem('cart', JSON.stringify(listCart)) : localStorage.removeItem('cart')
        this.cart.next(listCart); 
      }
    }
}
  //agregamos un ticket a la sesión
  addTicket(event: Cart, index: number, q: number) {
    
    if(!event.session[index].availability) {
      return;
    }
   this.updateEvent(event, q+event.session[index].itemQnt, index);
  }
  //Eliminamos de a un ticket
   removeTicket(p: any, index = 0) {
    this.updateEvent(p, p.session[index].itemQnt - 1, index);
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
    this.addCart(ev)
  }
}
