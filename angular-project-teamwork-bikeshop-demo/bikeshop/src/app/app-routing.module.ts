import { AdminProductsDetailComponent } from './root-modul/components/admin-products-detail/admin-products-detail.component';
import { ProductDetailsComponent } from './root-modul/components/product-details/product-details.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CatalogueComponent } from './root-modul/components/catalogue/catalogue.component';
import { AdminTicketsComponent } from './root-modul/components/admin-tickets/admin-tickets.component';
import { AdminProductsComponent } from './root-modul/components/admin-products/admin-products.component';
import { AdminTicketsDetailComponent } from './root-modul/components/admin-tickets-detail/admin-tickets-detail.component';
import { IntroComponent } from './root-modul/components/intro/intro.component';
import { LoginComponent } from './root-modul/components/login/login.component';
import { AuthGuard } from './root-modul/guards/auth.guard';

const routes: Routes = [
  { path: '', component: IntroComponent },
  { path: 'products', component: CatalogueComponent },
  { path: 'products/:index', component: ProductDetailsComponent },
  { path: 'adminProducts', component: AdminProductsComponent, canActivate: [AuthGuard] },
  { path: 'adminProducts/:index', component: AdminProductsDetailComponent, canActivate: [AuthGuard] },
  { path: 'adminProducts/:index/edit', component: AdminProductsDetailComponent, canActivate: [AuthGuard] },
  { path: 'adminTickets', component: AdminTicketsComponent, canActivate: [AuthGuard] },
  { path: 'adminTickets/:index', component: AdminTicketsDetailComponent, canActivate: [AuthGuard] },
  { path: 'adminTickets/:index/edit', component: AdminTicketsDetailComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  // { path: 'products', loadChildren: () => import('./root-modul/root-modul.module').then(m => m.RootModulModule) },
  { path: '**', redirectTo: '/products' }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
})
export class AppRoutingModule { }
