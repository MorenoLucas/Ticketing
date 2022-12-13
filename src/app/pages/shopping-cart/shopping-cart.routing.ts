import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShoppingcardComponent } from 'src/app/components/shoppingcard/shoppingcard.component';


export const routes: Routes = [
  {
    path: '',
    component: ShoppingcardComponent
  }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class ShoppingCartRoutingModule { }