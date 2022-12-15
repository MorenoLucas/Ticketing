import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { CardEventComponent } from './card-event/card-event.component';
import { ShoppingcardComponent } from './shoppingcard/shoppingcard.component';
import { RouterModule } from '@angular/router';
import { AddCartComponent } from './add-cart/add-cart.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    HeaderComponent,
    CardEventComponent,
    ShoppingcardComponent,
    AddCartComponent
  ],
  imports: [
    CommonModule, RouterModule, SharedModule
  ], 
  exports: [    HeaderComponent,
    CardEventComponent,
    ShoppingcardComponent, AddCartComponent], providers: [DatePipe]
})
export class ComponentsModule { }
