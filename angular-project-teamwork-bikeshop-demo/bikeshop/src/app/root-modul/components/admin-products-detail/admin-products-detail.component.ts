import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AdminCRUDService } from '../../service/admin-crud.service';
import { ProductModel } from 'src/app/shared-modul/model/product.model';

@Component({
  selector: 'app-admin-products-detail',
  templateUrl: './admin-products-detail.component.html',
  styleUrls: ['./admin-products-detail.component.scss']
})
export class AdminProductsDetailComponent implements OnInit {

  productDetailsForm: FormGroup = new FormGroup({
    brand: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required]),
    category: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required]),
    amount: new FormControl('', [Validators.required]),
    imgUrl2: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
  })

  get brand() { return this.productDetailsForm.get('brand'); }

  get name() { return this.productDetailsForm.get('name'); }

  get category() { return this.productDetailsForm.get('category'); }

  get price() { return this.productDetailsForm.get('price'); }

  get amount() { return this.productDetailsForm.get('amount'); }

  get imgUrl2() { return this.productDetailsForm.get('imgUrl2'); }

  get description() { return this.productDetailsForm.get('description'); }

  @ViewChild('submitBtn') btn?: ElementRef<HTMLButtonElement>;

  updateProductId?: string;

  constructor(private activatedRoute: ActivatedRoute, private adminCRUDService: AdminCRUDService, private router: Router) { }

  ngOnInit(): void {
    console.log('Betöltéskor a customer ID:' + this.updateProductId);
    this.activatedRoute.paramMap.subscribe({
      next: (params: ParamMap) => {
        let productId = params.get('index');
        console.log('van customerId?' + productId);
        if (productId) {
          this.adminCRUDService.getProductWithGetDoc(productId).subscribe({
            next: data => {
              this.productDetailsForm.patchValue(data);
              this.updateProductId = data.id;
            }
          })
        }
      }
    })
  }

  submitDetailsForm() {
    console.log(this.productDetailsForm.value);
    console.log(this.btn?.nativeElement);                   // Kvázi hasonló, mint amikor getElementByID-val elkaptam a btn elemet
    this.btn?.nativeElement.setAttribute('style', 'color:orange');

    const newProduct: ProductModel = this.productDetailsForm.value;

    if (this.updateProductId) {
      newProduct.id = this.updateProductId;
      this.adminCRUDService.updateProduct(newProduct).subscribe();
    } else {
      this.adminCRUDService.addProduct(newProduct).subscribe({
        next: (docRef) => {
          console.log("Product saved with ID: ", docRef['id'])
        },
        error: err => console.error(err),
        complete: () => { }
      })
    }
    this.router.navigate(['adminProducts'])
  }

}
