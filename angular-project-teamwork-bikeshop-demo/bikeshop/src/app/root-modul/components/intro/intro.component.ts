import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { FeaturesModel } from 'src/app/shared-modul/model/features.model';
import { ProductListService } from 'src/app/shared-modul/service/products/product-list.service';
import { FeaturesService } from '../../service/features.service';
import { ProductModel } from 'src/app/shared-modul/model/product.model';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.scss']
})
export class IntroComponent implements OnInit {

  features: Array<FeaturesModel>;

  mostExpensiveProduct$?: Observable<ProductModel[]>

  constructor(private featuresService: FeaturesService, private productListService: ProductListService, private router: Router) {
    this.features = this.featuresService.feutures;
  }

  ngOnInit(): void {
    this.mostExpensiveProduct$ = this.productListService.getMostExpensiveProduct();
  }

  public async goToDetails(productId: string) {
    await this.router.navigate(['products', productId])
  }

}
