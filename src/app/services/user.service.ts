import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ShippingAddress } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:5000/api/protected';

  constructor(private http: HttpClient) {}

  getUserProfile(): Observable<any> {
    return this.http.get(`${this.apiUrl}/profile`);
  }

  updateUserProfile(updatedData: {
    first_name?: string;
    last_name?: string;
    email?: string;
    password?: string;
    currentPassword?: string;
    newPassword?: string;
    confirmPassword?: string;
    
  }): Observable<any> {
    return this.http.put(`${this.apiUrl}/profile`, updatedData);
  }

  getUserAddresses(): Observable<ShippingAddress[]> {
    return this.http.get<ShippingAddress[]>(`${this.apiUrl}/shipping-address`);
  }

  addShippingAddress(addressData: ShippingAddress): Observable<{ message: string; shippingAddress: ShippingAddress }> {
    return this.http.post<{ message: string; shippingAddress: ShippingAddress }>(
      `${this.apiUrl}/shipping-address`, 
      addressData
    );
  }

  removeShippingAddress(addressId: number): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.apiUrl}/shipping-address/${addressId}`);
  }

  getUserOrders(): Observable<any> {
    return this.http.get(`${this.apiUrl}/orders`);
  }

  createOrder(orderData: {
    cartItems: { product_id: number; quantity: number; price: number }[];
    total_price: number;
    payment_method: string;
    shipping_address: string;
  }): Observable<{ message: string; order_id: number }> {
    return this.http.post<{ message: string; order_id: number }>(`${this.apiUrl}/orders`, orderData);
  }
}
