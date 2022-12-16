import { Component, OnInit } from '@angular/core';
import CartService from 'src/app/services/cart.service';

@Component({
  selector: 'app-shoppingcard',
  templateUrl: './shoppingcard.component.html',
  styleUrls: ['./shoppingcard.component.scss']
})
export class ShoppingcardComponent implements OnInit {
  tickets: any
  constructor(private _cartService: CartService) { }

  ngOnInit(): void {
    this._cartService.currentDataCart$.subscribe(data => {
      if(data){
        this.tickets = data
      }
    })
  }

  removeTicket(ticket: any, id:string): void {
    this._cartService.removeElementCart(ticket,id)
  }
}
