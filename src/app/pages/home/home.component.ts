import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ToolsService } from 'src/app/services/tools.service';
import { Events } from 'src/app/types/event';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class HomeComponent implements OnInit {
  $totalEvents: Observable<Events[] | undefined>
  constructor(private _tools: ToolsService) {
    this.$totalEvents = this._tools.totalEvents$
  }

  ngOnInit(): void {
    this.getEvents();
  }


  getEvents(): void {
    this._tools.getEvents()

  }
}
