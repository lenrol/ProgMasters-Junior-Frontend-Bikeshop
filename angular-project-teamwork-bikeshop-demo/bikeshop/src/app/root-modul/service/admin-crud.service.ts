import { from, map, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { addDoc, collection, deleteDoc, doc, DocumentData, Firestore, getDoc, increment, setDoc, updateDoc } from '@angular/fire/firestore';
import { ProductModel } from 'src/app/shared-modul/model/product.model';

@Injectable({
  providedIn: 'root'
})
export class AdminCRUDService {

  private readonly productsCollectionRef = collection(this.firestore, 'products');

  constructor(private firestore: Firestore) { }

  deleteProduct(productId: string): Observable<void> {
    const productDoc = doc(this.firestore, `products/${productId}`);
    return from(deleteDoc(productDoc));
  }

  getProductWithGetDoc(id: string) {
    const productDoc = doc(this.firestore, `products/${id}`);
    return from(getDoc(productDoc)).pipe(
      map(doc => {
        const productData: ProductModel = doc.data() as ProductModel;
        productData.id = doc.id;
        return productData
      })
    )
  }

  updateProduct(product: ProductModel): Observable<void> {
    const productDoc = doc(this.firestore, `products/${product.id}`);
    return from(setDoc(productDoc, product));
  }

  addProduct(product: ProductModel): Observable<DocumentData> {
    return from(addDoc(this.productsCollectionRef, product))
  }

  public async amountIncrease(product: ProductModel) {
    const productDocRef = doc(this.firestore, `products/${product.id}`);
    if (productDocRef) {
      setDoc(productDocRef, product);
      await updateDoc(productDocRef, { amount: increment(1) })
    }
  }

  public async amountReduce(product: ProductModel) {
    const productDocRef = doc(this.firestore, `products/${product.id}`);
    if (productDocRef) {
      setDoc(productDocRef, product);
      await updateDoc(productDocRef, { amount: increment(-1) })
    }
  }
}
