import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { RouterModule } from '@angular/router';
import { HomeRoutingModule, routes } from './home.routing';
import { ComponentsModule } from 'src/app/components/components.module';



@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
HomeRoutingModule, ComponentsModule  ]
})
export class HomeModule { }
