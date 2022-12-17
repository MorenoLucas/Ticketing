import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output } from '@angular/core';
import CartService from 'src/app/services/cart.service';

@Component({
  selector: 'app-shoppingcard',
  templateUrl: './shoppingcard.component.html',
  styleUrls: ['./shoppingcard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class ShoppingcardComponent implements OnInit {
  tickets: any
  constructor(public _cartService: CartService) { }

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
