import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private baseUrl = environment.apiEndpoints.cart;

  constructor(private http: HttpClient) {}

  addToCart(productId: number, quantity: number): Observable<any> {
    return this.http.post<any>(this.baseUrl, { product_id: productId, quantity })
      .pipe(catchError(error => throwError(() => error)));
  }

  removeFromCart(products: { product_id: number; quantity: number }[]): Observable<any> {
    return this.http.delete<any>(this.baseUrl, { body: { products } })
      .pipe(catchError(error => throwError(() => error)));
  }

  getCart(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl)
      .pipe(catchError(error => throwError(() => error)));
  }

  updateCart(cartItems: { product_id: number; quantity: number }[]): Observable<any> {
    return this.http.put<any>(this.baseUrl, { cartItems })
      .pipe(catchError(error => throwError(() => error)));
  }
}
