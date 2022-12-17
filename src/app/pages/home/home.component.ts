import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ToolsService } from 'src/app/services/tools.service';
import { Events } from '../../types/event';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class HomeComponent implements OnInit {
  events!: Events[] ;
  constructor(public _tools: ToolsService) { 

  }

  ngOnInit(): void {
    this.getEvents();
  }


  getEvents(): void {
    this._tools.getEvents()
    // .subscribe({
    //   next: (eventsApi: Events[]) => {
    //     eventsApi?.sort((a, b) => {return a.startDate.localeCompare(b.startDate)})
        
    //     this.events = eventsApi
    //   }
    // })
  }
}
