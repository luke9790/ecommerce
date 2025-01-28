import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  private baseUrl = `http://localhost:5000/api/protected/favorites`;  // Assicurati di usare il corretto dominio e porta


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
