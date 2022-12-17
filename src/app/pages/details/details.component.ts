import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import CartService from 'src/app/services/cart.service';
import { ToolsService } from 'src/app/services/tools.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DetailsComponent implements OnInit {


  constructor(private _activateRoute: ActivatedRoute, public _tools: ToolsService, public _cartService: CartService) { }

  ngOnInit(): void {
    this.getParams()
  }
 

  getParams(): any {
    this._activateRoute.params.subscribe(params => {
      if(params['id']) {
          this.getEvent(params['id'])
        
      }
    })      

  }
  getEvent(id: string) {
    this._tools.getEventById(id)
  }

}
