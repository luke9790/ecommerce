import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private baseUrl = environment.apiEndpoints.cart;

  constructor(private http: HttpClient) {}

  addToCart(productId: number, quantity: number): Observable<any> {
    return this.http.post<any>(this.baseUrl, { product_id: productId, quantity });
  }

  removeFromCart(products: { product_id: number; quantity: number }[]): Observable<any> {
    return this.http.delete<any>(this.baseUrl, { body: { products } });
  }

  getCart(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }

  updateCart(cartItems: { product_id: number; quantity: number }[]): Observable<any> {
    return this.http.put<any>(this.baseUrl, { cartItems });
  }
}
