import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { CardEventComponent } from './card-event/card-event.component';
import { ShoppingcardComponent } from './shoppingcard/shoppingcard.component';



@NgModule({
  declarations: [
    HeaderComponent,
    CardEventComponent,
    ShoppingcardComponent
  ],
  imports: [
    CommonModule
  ], 
  exports: [    HeaderComponent,
    CardEventComponent,
    ShoppingcardComponent]
})
export class ComponentsModule { }
