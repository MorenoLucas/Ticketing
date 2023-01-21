import { Component, Input } from '@angular/core';
import CartService from 'src/app/services/cart.service';
import { Cart,  } from 'src/app/types/event';

@Component({
  selector: 'app-add-cart',
  templateUrl: './add-cart.component.html',
  styleUrls: ['./add-cart.component.scss']
})
export class AddCartComponent {
  @Input() eventCart: Cart | undefined
  @Input() index!: any;
  constructor(private _cartService: CartService) {
   }

   removeTicket(eventCart:Cart, index:number){
     this._cartService.removeTicket(eventCart, index)

   }

   updateEvent(eventCart:Cart, $event:any, index:number){
    this._cartService.updateEvent(eventCart, $event, index)
   }

   addTicket(eventCart:Cart, index:number,){
    this._cartService.addTicket(eventCart, index,1)
   }

}
