import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {
    path: 'home', 
    loadChildren: () => import('./pages/home/home.module').then((m) => m.HomeModule)
  },
  {
    path: 'details/:id', 
    loadChildren: () => import('./pages/details/details.module').then((m) => m.DetailsModule)
  },
  {
    path: 'shoppingcart', 
    loadChildren: () => import('./pages/shopping-cart/shopping-cart.module').then((m) => m.ShoppingCartModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
