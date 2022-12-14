import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToolsService } from 'src/app/services/tools.service';
import { EventDetail } from 'src/app/types/event';
import { Sessions } from '../../types/event';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  event: EventDetail | undefined  
  sessions: Sessions[] | undefined  
  constructor(private _activateRoute: ActivatedRoute, private _tools: ToolsService) { }

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
    console.log(id);
    this._tools.getEventById(id).subscribe({
      next: (data: any) => {
        this.event = data.event
        this.sessions = data.sessions

      },
      error: (error: any) => {
        console.log('error', error);
      }
    })
  }
}
