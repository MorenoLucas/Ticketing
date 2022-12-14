import { DatePipe } from '@angular/common';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-card-event',
  templateUrl: './card-event.component.html',
  styleUrls: ['./card-event.component.scss']
})
export class CardEventComponent implements OnInit, OnChanges {

  @Input() event: any | undefined 
  constructor(private _datePipe: DatePipe) {
    console.log(this.event);
   }
  ngOnChanges(changes: SimpleChanges) {
    console.log(changes)
  }
  ngOnInit(): void {
  }


 
}
