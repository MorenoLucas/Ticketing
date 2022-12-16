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
        this.tickets.map((ticket:any) =>{
          let acu:number = 0
          ticket.session.forEach((item:any) =>{
            item.itemQnt == 0 ? acu = acu + 1 : acu
          })
          if(acu == ticket.session.length){
            ticket['disabled'] = true
          }else{
            ticket['disabled'] = false
          }
        })
      }
    })
  }

  removeTicket(ticket: any, id:string): void {
    this._cartService.removeElementCart(ticket,id)
  }
}
