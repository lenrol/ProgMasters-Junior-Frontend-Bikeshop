import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ProductModel } from 'src/app/shared-modul/model/product.model';
import { ProductListService } from 'src/app/shared-modul/service/products/product-list.service';
// import { MatPaginatorModule } from '@angular/material/paginator';


@Component({
  selector: 'app-catalogue',
  templateUrl: './catalogue.component.html',
  styleUrls: ['./catalogue.component.scss'],
})
export class CatalogueComponent implements OnInit {

  products$?: Observable<ProductModel[]>;
  values = '';

  dataSize$?: Observable<ProductModel[]>;
  filterSize$?: Observable<ProductModel[]>;

  public readonly pageSizeOptions = [6, 8, 10];

  // filterProperties: string[] = ['brand', 'category'];
  // selectedFilterProps!: { type: string, placeholder: string };
  // selectedPropValues$?: Observable<string[]>

  @ViewChild('filterValue') private filterValue!: ElementRef;

  constructor(private productListService: ProductListService, private router: Router) { }

  ngOnInit(): void {
    this.dataSize$ = this.productListService.getAvailableProducts();
    this.products$ = this.productListService.getPaginatedProducts(0, this.pageSizeOptions[0]);
  }

  handlePageEvent(e: PageEvent) {
    this.products$ = this.productListService.getPaginatedProducts(e.pageSize * e.pageIndex, e.pageSize * e.pageIndex + e.pageSize);
    // console.log(e);
  }

  //* Keresztszűrés
  allFilter(min: string, max: string, inputValue: string) {
    this.dataSize$ = this.productListService.getProductsByFilters(+min, +max, inputValue, 0, this.pageSizeOptions[0]);
    this.products$ = this.productListService.getProductsByFilters(+min, +max, inputValue, 0, this.pageSizeOptions[0]);
  }

  //* Routing aloldalra
  public async goToDetails(productId: string) {
    console.log(productId);
    await this.router.navigate(['products', productId])
  }

  // //* Price between értékét dobja ki
  // priceBetween(min: string, max: string, input: string) {
  //   // this.products$ = this.productListService.getProductsByPrice(+min, +max);
  //   this.products$ = this.productListService.getProductsByFilters(+min, +max, input);
  // }

  // //* Input mező keresője
  // onKey(inputValue: string) {
  //   // this.values = (event.target as HTMLInputElement).value;
  //   // console.log(this.values);
  //   this.products$ = this.productListService.getInputProducts(inputValue);
  //   // this.products$ = this.productListService.getProductsByFilters(+min, +max, this.values);
  // }



  //* Szabi féle kereső - refactra szorul
  // selectFilterBy(event: any) {
  //   this.selectedFilterProps = {
  //     type: `${event.value}`,
  //     placeholder: `Select ${event.value}`
  //   }
  //   this.selectedPropValues$ = this.productListService.getPropertyValues(event.value);
  // }

  // filterCustomers(): void {
  //   if (this.selectedFilterProps) {
  //     const filterProp = this.selectedFilterProps.type;
  //     const filterValue = this.filterValue.nativeElement.value;
  //     this.products$ = this.productListService.getFilteredCustomers(filterProp, filterValue)
  //   }
  // }




}


