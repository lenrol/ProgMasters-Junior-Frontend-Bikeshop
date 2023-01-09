import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ProductModel } from 'src/app/shared-modul/model/product.model';
import { ProductListService } from 'src/app/shared-modul/service/products/product-list.service';
import { AdminCRUDService } from '../../service/admin-crud.service';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.scss']
})
export class AdminProductsComponent implements OnInit {

  products$?: Observable<ProductModel[]>;

  constructor(private productListService: ProductListService, private router: Router, private adminCURDService: AdminCRUDService) { }

  ngOnInit(): void {
    this.products$ = this.productListService.getProducts();
  }

  //* CRUD MŰVELETEK gombjai

  // Összes részlet megtekintése
  public async allDetails(productId: string) {
    await this.router.navigate(['adminProducts', productId])
  }

  // Termék szerkesztése
  public async updateProduct(productId: string) {
    await this.router.navigate(['adminProducts', productId, 'edit'])
  }

  // Termék teljes törlése
  public deleteProduct(productId: string): void {
    if (confirm('Do you wanna delete this product?')) {
      this.adminCURDService.deleteProduct(productId).subscribe();
    }
  }

  // Új termék hozzáadása
  public addProduct() {
    this.router.navigate(['adminProducts/edit'])
  }

  //* AMOUNT állítása
  reduce(product: ProductModel) {
    this.adminCURDService.amountReduce(product)
  }

  increase(product: ProductModel) {
    this.adminCURDService.amountIncrease(product)
  }



}
