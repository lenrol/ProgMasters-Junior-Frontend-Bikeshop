import { MatPaginatorModule } from '@angular/material/paginator';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CatalogueComponent } from './components/catalogue/catalogue.component';
import { SharedModulModule } from '../shared-modul/shared-modul.module';
import { ProductListService } from '../shared-modul/service/products/product-list.service';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { LoginComponent } from './components/login/login.component';
import { AdminProductsComponent } from './components/admin-products/admin-products.component';
import { AdminTicketsComponent } from './components/admin-tickets/admin-tickets.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AdminProductsDetailComponent } from './components/admin-products-detail/admin-products-detail.component';
import { AdminTicketsDetailComponent } from './components/admin-tickets-detail/admin-tickets-detail.component';
import { RouterModule, Routes } from '@angular/router';
import { IntroComponent } from './components/intro/intro.component';
import { AuthGuard } from './guards/auth.guard';

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
  declarations: [
    CatalogueComponent,
    ProductDetailsComponent,
    LoginComponent,
    AdminProductsComponent,
    AdminTicketsComponent,
    NavbarComponent,
    AdminProductsDetailComponent,
    AdminTicketsDetailComponent,
  ],
  imports: [
    CommonModule,
    SharedModulModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    MatPaginatorModule
  ],
  providers: [
    ProductListService
  ],
  exports: [
    CatalogueComponent,
    ProductDetailsComponent,
    LoginComponent,
    AdminProductsComponent,
    AdminTicketsComponent,
    NavbarComponent,
    RouterModule
  ]
})
export class RootModulModule { }
