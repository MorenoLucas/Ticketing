import { Observable } from 'rxjs';
import { ChangeDetectionStrategy, Component} from '@angular/core';
import CartService from 'src/app/services/cart.service';
import { Cart } from 'src/app/types/event';

@Component({
  selector: 'app-shoppingcard',
  templateUrl: './shoppingcard.component.html',
  styleUrls: ['./shoppingcard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class ShoppingcardComponent {
   $currentCart: Observable<Cart[] | undefined>;

  constructor(private _cartService: CartService) {
    this.$currentCart = this._cartService.currentDataCart$
  }


  removeTicket(ticket: any, id:number): void {
    this._cartService.removeTicket(ticket,id)
  }
}
