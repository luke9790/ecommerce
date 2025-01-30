import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ShippingAddress, Order } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:5000/api/protected';

  constructor(private http: HttpClient) {}

  getUserProfile(): Observable<any> {
    return this.http.get(`${this.apiUrl}/profile`).pipe(
      catchError((error) => throwError(() => error))
    );
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
    return this.http.put(`${this.apiUrl}/profile`, updatedData).pipe(
      catchError((error) => throwError(() => error))
    );
  }

  getUserAddresses(): Observable<ShippingAddress[]> {
    return this.http.get<ShippingAddress[]>(`${this.apiUrl}/shipping-address`).pipe(
      catchError((error) => throwError(() => error))
    );
  }

  addShippingAddress(addressData: ShippingAddress): Observable<{ message: string; shippingAddress: ShippingAddress }> {
    return this.http.post<{ message: string; shippingAddress: ShippingAddress }>(
      `${this.apiUrl}/shipping-address`, 
      addressData
    ).pipe(
      catchError((error) => throwError(() => error))
    );
  }

  removeShippingAddress(addressId: number): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.apiUrl}/shipping-address/${addressId}`).pipe(
      catchError((error) => throwError(() => error))
    );
  }

  getUserOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.apiUrl}/orders`).pipe(
      catchError((error) => throwError(() => error))
    );
  }

  createOrder(orderData: Order): Observable<{ message: string; order_id: number }> {
    return this.http.post<{ message: string; order_id: number }>(`${this.apiUrl}/orders`, orderData).pipe(
      catchError((error) => throwError(() => error))
    );
  }
}
