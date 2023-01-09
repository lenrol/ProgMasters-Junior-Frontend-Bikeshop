import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ProductModel } from 'src/app/shared-modul/model/product.model';
import { ProductListService } from 'src/app/shared-modul/service/products/product-list.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  public product?: ProductModel;

  constructor(private productListService: ProductListService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    console.log(this.activatedRoute);
    this.activatedRoute.paramMap.subscribe({
      next: (params: ParamMap) => {
        let productId = params.get('index');
        if (productId) {
          this.productListService.getProduct(productId).subscribe({
            next: data => { this.product = data; },
            error: err => console.error(err)
          })
        }
      }
    })

  }

  log() {
    console.log(this.product);
  }

  goToHome() {
    this.router.navigate(['products'])
  }
}


