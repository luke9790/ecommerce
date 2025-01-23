import { Injectable } from '@angular/core';
import { Product } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root',
})
export class ShopService {
  private defaultCurrencyByLanguage: Record<string, string> = {
    'en-US': 'USD',
    'it': 'EUR',
    'es': 'EUR',
  };

  private products: Product[] = [
    {
      id: 1,
      name: 'T-shirt Basic',
      description: 'Binge drinking; two or more days of continuous drunkenness.',
      label: 'Regular',
      brand: 'Nike',
      stock: 50,
      image: '',
      categoryId: 1,
      type: 'male',
      isFeatured: true,
      price: 19.99,
      currency: 'USD',
      discount: 10,
    },
    {
      id: 2,
      name: 'Jeans Slim Fit',
      description: 'A stylish pair of slim fit jeans.',
      label: 'Premium',
      brand: 'Levi’s',
      stock: 30,
      image: '',
      categoryId: 2,
      type: 'male',
      isFeatured: false,
      price: 49.99,
      currency: 'USD',
    },
    {
      id: 3,
      name: 'Sneakers Classic',
      description: 'Comfortable and stylish sneakers.',
      label: 'Adventure',
      brand: 'Adidas',
      stock: 20,
      image: '',
      categoryId: 3,
      type: 'unisex',
      isFeatured: true,
      price: 89.99,
      currency: 'USD',
      discount: 15,
    },
    {
      id: 4,
      name: 'Hoodie Deluxe',
      description: 'A cozy and warm hoodie.',
      label: 'Exclusive',
      brand: 'Zara',
      stock: 40,
      image: '',
      categoryId: 4,
      type: 'female',
      isFeatured: false,
      price: 39.99,
      currency: 'USD',
    },
  ];

  constructor() {}

  /**
   * Recupera tutti i prodotti con lingua e valuta.
   * @param language Lingua selezionata (es. 'en-US', 'it', 'es')
   * @param currency Valuta selezionata (opzionale, usa quella di default se non fornita)
   * @param filters Filtri opzionali (categoria, tipo, ecc.)
   * @returns Una Promise con l'elenco dei prodotti filtrati.
   */
  async getProducts(language: string, currency?: string, filters?: any): Promise<Product[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        let filteredProducts = [...this.products];

        // Applica i filtri
        if (filters) {
          if (filters.categoryId) {
            filteredProducts = filteredProducts.filter(
              (product) => product.categoryId === filters.categoryId
            );
          }
          if (filters.type) {
            filteredProducts = filteredProducts.filter(
              (product) => product.type === filters.type
            );
          }
        }

        // Determina la valuta da usare
        const resolvedCurrency = currency || this.getDefaultCurrency(language);

        // Converti i prezzi se necessario
        if (resolvedCurrency !== 'USD') {
          filteredProducts = filteredProducts.map((product) => ({
            ...product,
            price: this.convertCurrency(product.price, product.currency, resolvedCurrency),
            currency: resolvedCurrency,
          }));
        }

        resolve(filteredProducts);
      }, 500); // Simula un ritardo di 500ms
    });
  }

  /**
   * Recupera i prodotti in evidenza con lingua e valuta.
   * @param language Lingua selezionata (es. 'en-US', 'it', 'es')
   * @param currency Valuta selezionata (opzionale, usa quella di default se non fornita)
   * @returns Una Promise con i prodotti in evidenza.
   */
  async getFeaturedProducts(language: string, currency?: string): Promise<Product[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        let featuredProducts = this.products.filter((product) => product.isFeatured);

        // Determina la valuta da usare
        const resolvedCurrency = currency || this.getDefaultCurrency(language);

        // Converti i prezzi se necessario
        if (resolvedCurrency !== 'USD') {
          featuredProducts = featuredProducts.map((product) => ({
            ...product,
            price: this.convertCurrency(product.price, product.currency, resolvedCurrency),
            currency: resolvedCurrency,
          }));
        }

        resolve(featuredProducts);
      }, 500); // Simula un ritardo di 500ms
    });
  }

  /**
   * Restituisce la valuta di default per una lingua.
   * @param language Lingua selezionata
   * @returns La valuta di default (es. USD, EUR)
   */
  private getDefaultCurrency(language: string): string {
    return this.defaultCurrencyByLanguage[language] || 'USD';
  }

  /**
   * Simula la conversione della valuta.
   * @param price Prezzo originale
   * @param fromCurrency Valuta originale
   * @param toCurrency Valuta di destinazione
   * @returns Prezzo convertito
   */
  private convertCurrency(price: number, fromCurrency: string, toCurrency: string): number {
    const exchangeRates: Record<string, number> = {
      USD: 1,
      EUR: 0.9,
      GBP: 0.8,
    };

    const fromRate = exchangeRates[fromCurrency] || 1;
    const toRate = exchangeRates[toCurrency] || 1;

    return parseFloat(((price / fromRate) * toRate).toFixed(2));
  }
}
