import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { Cart, EventDetail, Sessions } from 'src/app/types/event';

@Component({
  selector: 'app-add-cart',
  templateUrl: './add-cart.component.html',
  styleUrls: ['./add-cart.component.scss']
})
export class AddCartComponent implements OnInit, OnChanges {
  @Input() eventCart!: EventDetail  
  @Input() session!: any 
  event!: Cart
  constructor(public _cartService: CartService) {
   
   }

   ngOnChanges(changes: SimpleChanges) {
    let changeSession = changes['session'].currentValue
    this.event = {
      id: this.eventCart.id,
      title: this.eventCart.title,
      session: [{
        availability : this.session.availability,
        itemQnt:  changeSession.itemQnt !== undefined ? changeSession.itemQnt : 0,
        date: this.session.date
      }]
    }
   }
  ngOnInit(): void {
    
  }

}
