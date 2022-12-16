import { Injectable } from '@angular/core';
import { Session } from 'inspector';
import { BehaviorSubject, Subject } from 'rxjs';
import { Cart } from '../types/event';
import { ToolsService } from './tools.service';

@Injectable({
  providedIn: 'root',
})
export default class CartService {
  
  
  cart2: Cart[] | undefined

  private cart = new BehaviorSubject<Array<Cart>>([]); 
  public currentDataCart$ = this.cart.asObservable(); 
  constructor(private _tools: ToolsService) {}

  //Agregamos evento al carrito de compra
  public addCart(newEvent:any, index:number){
    let listCart = this.cart.getValue()
    if(listCart){
      let eventIndex = listCart.findIndex( item => item.id === newEvent.id)
      if(eventIndex !== -1){
        //hacemos push a las sesiones de ese artista listCart[eventIndex]
        let sesionIndex = listCart[eventIndex].session.findIndex( (item:any) => item.date == newEvent.session[index].date)
        if(sesionIndex !== -1){
          listCart[eventIndex].session[sesionIndex] = newEvent.session[index]
          if(listCart[eventIndex].session[sesionIndex].itemQnt == 0 ){
            console.log('0 ticket');
            listCart[eventIndex].session.splice(sesionIndex, 1)         
               // if(listCart[eventIndex].session.length == 0){
            //   console.log('Entra listcar');
            //   listCart.splice(eventIndex,1)
            // }
          }
        }else{
          listCart[eventIndex].session.push(newEvent.session[0])
        }
      }else {
        listCart.push(newEvent)
      }
    }else{
      listCart = []
      listCart.push(newEvent)
    }
    console.log(listCart);
    this.cart.next(listCart)
  }

  //Eliminamos elemento del carrito
  public removeElementCart(newEvent:any, id:string){
    console.log(newEvent);
    //Obtenemos el valor actual de carrito
    let listCart = this.cart.getValue();
    //Buscamos el item del carrito para eliminar
    let eventIndex = listCart.findIndex((item => item.id == id));
    if(eventIndex != -1)
    {
      let sesionIndex = listCart[eventIndex].session.findIndex( (item:any) => item.date == newEvent.date)
      if(sesionIndex !== -1){
        if(listCart[eventIndex].session[sesionIndex].itemQnt > 0){
          this.removeTicket(listCart[eventIndex], sesionIndex);
        }

      }
      //Eliminamos el item del array del carrito
    }
    // this.cart.next(listCart); //Enviamos el valor a todos los Observers que estan escuchando nuestro Observable
}

  addTicket(event: Cart, index: number, q: number) {
    
    if(!event.session[index].availability) {
      return;
    }
   this.updateEvent(event, q+event.session[index].itemQnt, index);
  }

   removeTicket(p: any, index = 0) {
    this.updateEvent(p, p.session[index].itemQnt - 1, index);
  }

  deleteEvent(event: Cart) {
    // this.updateEvent(event, 0);
  }

  updateEvent(event: Cart, value: any, index:number) {
   
    if (value > event.session[index].availability) {
      event.session[index].itemQnt = event.session[index].availability;
      
    } else {

      event.session[index].itemQnt = value || 0;
      console.log(event.session[index].itemQnt);
    }

    if (event.session[index].itemQnt < 0) {
      event.session[index].itemQnt = 0;
      
    }
    
    this._tools.updateEvent(event)
    this.addCart(event, index)
  }
}
