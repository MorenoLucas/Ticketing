import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { RouterModule } from '@angular/router';
import { HomeRoutingModule, routes } from './home.routing';



@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
HomeRoutingModule  ]
})
export class HomeModule { }
