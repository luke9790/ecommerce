import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  private baseUrl = environment.apiEndpoints.favorites;


  constructor(private http: HttpClient) {}

  getFavorites(): Observable<number[]> {
    return this.http.get<{ message: string, productIds: number[] }>(this.baseUrl).pipe(
      map(response => response.productIds)
    );
  }
  

  addFavorite(productId: number): Observable<any> {
    return this.http.post<any>(this.baseUrl, { productId });
  }

  removeFavorite(productId: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${productId}`);
  }
}
