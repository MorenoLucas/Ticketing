import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import CartService from 'src/app/services/cart.service';
import { ToolsService } from 'src/app/services/tools.service';
import { Cart, EventDetail, Sessions } from 'src/app/types/event';

@Component({
  selector: 'app-add-cart',
  templateUrl: './add-cart.component.html',
  styleUrls: ['./add-cart.component.scss']
})
export class AddCartComponent implements OnInit, OnChanges {
  @Input() eventCart!: EventDetail  
  @Input() session!: any; 
  @Input() index!: any;
  event!: Cart
  constructor(public _cartService: CartService, public _tools: ToolsService) {
   
   }

   ngOnChanges(changes: SimpleChanges) {
    this.event = {
      id: this.eventCart.id,
      title: this.eventCart.title,
      subtitle: this.eventCart.subtitle,
      image: this.eventCart.image,
      session: this.session
    }
   }
  ngOnInit(): void {
    
  }

}
