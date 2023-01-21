import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToolsService } from 'src/app/services/tools.service';
import { Observable } from 'rxjs';
import { Cart } from 'src/app/types/event';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DetailsComponent implements OnInit {
  $artistSession: Observable<Cart | undefined>;


  constructor(private _activateRoute: ActivatedRoute, private _tools: ToolsService) {
    this.$artistSession = this._tools.artistSession$
  }

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
