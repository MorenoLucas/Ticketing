import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailsRoutingModule } from './details.routing';
import { DetailsComponent } from './details.component';
import { ComponentsModule } from '../../components/components.module';



@NgModule({
  declarations: [DetailsComponent],
  imports: [
    CommonModule,
    DetailsRoutingModule, ComponentsModule
  ]
})
export class DetailsModule { }
