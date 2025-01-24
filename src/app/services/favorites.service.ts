import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  private baseUrl = '/api/favorites';

  constructor(private http: HttpClient) {}

  getFavorites(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }

  addFavorite(productId: number): Observable<any> {
    return this.http.post<any>(this.baseUrl, { productId });
  }

  removeFavorite(productId: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${productId}`);
  }
}
