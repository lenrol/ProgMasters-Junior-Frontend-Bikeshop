import { Injectable } from '@angular/core';
import { collectionData, collection, Firestore, doc, getDoc, getDocs, query, where, orderBy, limit } from '@angular/fire/firestore';
import { distinct, filter, from, map, mergeMap, Observable, take, tap, toArray, skip } from 'rxjs';
import { ProductModel } from '../../model/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductListService {

  private readonly productsCollectionRef = collection(this.firestore, 'products');

  constructor(private firestore: Firestore) { }

  //* Összes lekérése
  getProducts(): Observable<ProductModel[]> {
    return collectionData(this.productsCollectionRef, { idField: 'id' }) as Observable<ProductModel[]>;
  }

  //* Csak azokat kérje le, melyekből legalább van 1 db
  getAvailableProducts(): Observable<ProductModel[]> {
    return this.getProducts().pipe(
      map((products: ProductModel[]) => {
        return products.filter(product => (product.amount >= 1))
      })
    )
  }

  getPaginatedProducts(from: number = 0, to: number = 0): Observable<ProductModel[]> {
    return this.getProducts().pipe(
      map((products: ProductModel[]) => {
        return products.filter(product => (product.amount >= 1)).slice(from, to)
      }),
    )
  }

  //* Routinghoz szükséges lekérés
  public getProduct(id: string): Observable<ProductModel | undefined> {
    const productDoc = doc(this.firestore, `products/${id}`);
    return from(getDoc(productDoc)).pipe(
      map((doc) => {
        const productData: ProductModel = doc.data() as ProductModel;
        productData.id = doc.id;
        return productData;
      })
    )
  }

  //* Get values for filter property
  getPropertyValues(prop: string) {
    return from(getDocs(this.productsCollectionRef)).pipe(
      map(snapshot => snapshot.docs.map(doc => doc.data()[prop])),
      tap(data => console.log(data)),
      mergeMap(dataList => dataList),
      distinct(),
      tap(data => console.log(data)),
      toArray(),
      tap(data => console.log(data))
    )
  }

  getFilteredCustomers(prop: string, value: string): Observable<ProductModel[]> {
    const q = query(this.productsCollectionRef, where(prop, "==", value));
    return collectionData(q, { idField: 'id' }) as Observable<ProductModel[]>
  }

  //* INPUT kereső
  getInputProducts(value: string): Observable<ProductModel[]> {
    value = value.toLowerCase();
    return this.getAvailableProducts().pipe(
      map((products: ProductModel[]) => {
        return products.filter(product => (product.brand.toLocaleLowerCase().includes(value) || product.name.toLocaleLowerCase().includes(value)))
      })
    )
  }

  //* ÁR kereső
  getProductsByPrice(minValue: number, maxValue: number): Observable<ProductModel[]> {
    return this.getAvailableProducts().pipe(
      map((products: ProductModel[]) => {
        return products.filter(product => (product.price >= minValue && product.price <= maxValue))
      })
    )
  }


  getProductsByFilters(minValue: number, maxValue: number, value: string, from: number = 0, to: number = 0): Observable<ProductModel[]> {
    value = value.toLowerCase();
    return this.getAvailableProducts().pipe(
      map((products: ProductModel[]) => {
        return products.filter(product => (
          (product.price >= minValue && product.price <= maxValue) && (product.brand.toLocaleLowerCase().includes(value) || product.name.toLocaleLowerCase().includes(value))
        )).slice(from, to)
      })
    )
  }

  //Refact most-expensive:
  getMostExpensiveProduct(): Observable<ProductModel[]> {
    return this.getAvailableProducts().pipe(
      map((products: ProductModel[]) => {
        return products.filter(product => product.price == 9999)
      })
    )
  }

}
