import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../interfaces/interfaces';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root',
})
export class ShopService {
  private defaultCurrencyByLanguage: Record<string, string> = {
    'en-US': 'USD',
    'it': 'EUR',
    'es': 'EUR',
  };

  private apiUrl = environment.apiEndpoints.products;

  constructor(private http: HttpClient) {}

  getProducts(language: string, currency?: string, filters?: any): Observable<Product[]> {
    const resolvedCurrency = currency || this.getDefaultCurrency(language);
    let apiUrlWithParams = `${this.apiUrl}?language=${language}&currency=${resolvedCurrency}`;

    if (filters) {
      if (filters.categoryId) {
        apiUrlWithParams += `&categoryId=${filters.categoryId}`;
      }
      if (filters.subCategoryId) {
        apiUrlWithParams += `&subCategoryId=${filters.subCategoryId}`;
      }
      if (filters.type) {
        apiUrlWithParams += `&type=${filters.type}`;
      }
      if (filters.priceMin) {
        apiUrlWithParams += `&priceMin=${filters.priceMin}`;
      }
      if (filters.priceMax) {
        apiUrlWithParams += `&priceMax=${filters.priceMax}`;
      }
      if (filters.discount !== undefined) {
        apiUrlWithParams += `&discount=${filters.discount}`;
      }
      if (filters.stock !== undefined) {
        apiUrlWithParams += `&stock=${filters.stock}`;
      }
    }

    return this.http.get<{ message: string, products: any[] }>(apiUrlWithParams).pipe(
      map(response => response.products.map(this.transformProduct))
    );
  }

  getFeaturedProducts(language: string, currency?: string): Observable<Product[]> {
    const resolvedCurrency = currency || this.getDefaultCurrency(language);
    const apiUrlWithParams = `${this.apiUrl}?isFeatured=true&language=${language}&currency=${resolvedCurrency}`;

    return this.http.get<{ message: string, products: any[] }>(apiUrlWithParams).pipe(
      map(response => response.products.map(this.transformProduct))
    );
  }

  getProductById(language: string, id: number, currency?: string): Observable<Product> {
    const resolvedCurrency = currency || this.getDefaultCurrency(language);
    const apiUrlWithParams = `${this.apiUrl}/?id=${id}&language=${language}&currency=${resolvedCurrency}`;

    return this.http.get<{ message: string, products: any[] }>(apiUrlWithParams).pipe(
      map(response => {
        return this.transformProduct(response.products[0]);
      })
    );
  }

  getProductsByIds(language: string, productIds: number[], currency?: string): Observable<Product[]> {
    const resolvedCurrency = currency || this.getDefaultCurrency(language);
    const apiUrlWithParams = `${this.apiUrl}/by-ids/?language=${language}&currency=${resolvedCurrency}&ids=${productIds.join(',')}`;

    return this.http.get<{ message: string, products: any[] }>(apiUrlWithParams).pipe(
      map(response => response.products.map(this.transformProduct))
    );
  }

  private transformProduct(product: any): Product {
    return {
      id: product.id,
      name: product.ProductTranslations[0]?.name,
      description: product.ProductTranslations[0]?.description,
      label: product.label,
      brand: product.brand,
      stock: product.stock,
      image: product.image,
      categoryId: product.category_id,
      subCategoryId: product.sub_category_id,
      type: product.type,
      isFeatured: product.is_featured,
      price: parseFloat(product.ProductPrices[0]?.price),
      currency: product.ProductPrices[0]?.currency,
      discount: product.ProductPrices[0]?.discount ? parseFloat(product.ProductPrices[0]?.discount) : 0,
    };
  }

  private getDefaultCurrency(language: string): string {
    return this.defaultCurrencyByLanguage[language] || 'USD';
  }
}
