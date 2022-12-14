import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { CardEventComponent } from './card-event/card-event.component';
import { ShoppingcardComponent } from './shoppingcard/shoppingcard.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    HeaderComponent,
    CardEventComponent,
    ShoppingcardComponent
  ],
  imports: [
    CommonModule, RouterModule
  ], 
  exports: [    HeaderComponent,
    CardEventComponent,
    ShoppingcardComponent], providers: [DatePipe]
})
export class ComponentsModule { }
