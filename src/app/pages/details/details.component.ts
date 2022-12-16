import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import CartService from 'src/app/services/cart.service';
import { ToolsService } from 'src/app/services/tools.service';
import { Cart, EventDetail } from 'src/app/types/event';
import { Sessions } from '../../types/event';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DetailsComponent implements OnInit {
  event!: EventDetail   
  sessions!:any
  tickets: any
  eventCart!: Cart

  constructor(private _activateRoute: ActivatedRoute, public _tools: ToolsService, public _cartService: CartService) { }

  ngOnInit(): void {
    this.getParams()
    
    setTimeout(() => {
      this._cartService.currentDataCart$.subscribe( data => {
        if(data.length > 0){
          this.tickets = data
          let indexArtist = this.tickets.findIndex((item:any) => item.id == this.eventCart?.id)
          if(indexArtist !== -1){
            this.compareEvent(indexArtist)
          }
        } 
        // else{
        //   console.log('entra else details');
        //   this.sessions.map((item:any) => {
        //     item['itemQnt'] = 0
        //   })
        //   this.eventCart = {
        //     id: this.event.id,
        //     title: this.event.title,
        //     session: this.sessions 
        //   }
        //   console.log(this.eventCart)
        // }
      })
    }, 500)
  }
  compareEvent(indexArtist:number) {
        this.sessions.forEach( (item:any) => {
        let indexSession = this.tickets[indexArtist].session.findIndex( (session:any) => session.date == item.date );
        if(indexSession !== -1){
          item.itemQnt = this.tickets[indexArtist].session[indexSession].itemQnt || 0
          item.availability = String(this.tickets[indexArtist].session[indexSession].availability - this.tickets[indexArtist].session[indexSession].itemQnt)
        }
      })
  }

  getParams(): any {
    this._activateRoute.params.subscribe(params => {
      if(params['id']) {
        if(!this.tickets){
          this.getEvent(params['id'])
        }
      }
    })      

  }
  getEvent(id: string) {
    this._tools.getEventById(id)
  }
}
