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
      description: 'A simple and versatile T-shirt for everyday use.',
      label: 'Regular',
      brand: 'Nike',
      stock: 50,
      image: 'https://via.placeholder.com/150',
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
      description: 'A stylish pair of slim fit jeans for a modern look.',
      label: 'Premium',
      brand: 'Levi’s',
      stock: 30,
      image: 'https://via.placeholder.com/150',
      categoryId: 2,
      type: 'male',
      isFeatured: false,
      price: 49.99,
      currency: 'USD',
    },
    {
      id: 3,
      name: 'Sneakers Classic',
      description: 'Comfortable and stylish sneakers for daily wear.',
      label: 'Adventure',
      brand: 'Adidas',
      stock: 20,
      image: 'https://via.placeholder.com/150',
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
      description: 'A cozy and warm hoodie for chilly days.',
      label: 'Exclusive',
      brand: 'Zara',
      stock: 40,
      image: 'https://via.placeholder.com/150',
      categoryId: 4,
      type: 'female',
      isFeatured: false,
      price: 39.99,
      currency: 'USD',
    },
    {
      id: 5,
      name: 'Jogging Pants',
      description: 'Perfect pants for running or lounging at home.',
      label: 'Sport',
      brand: 'Puma',
      stock: 25,
      image: 'https://via.placeholder.com/150',
      categoryId: 5,
      type: 'unisex',
      isFeatured: false,
      price: 29.99,
      currency: 'USD',
    },
    {
      id: 6,
      name: 'Baseball Cap',
      description: 'A classic cap to protect you from the sun in style.',
      label: 'Classic',
      brand: 'New Era',
      stock: 60,
      image: 'https://via.placeholder.com/150',
      categoryId: 6,
      type: 'unisex',
      isFeatured: true,
      price: 14.99,
      currency: 'USD',
      discount: 5,
    },
    {
      id: 7,
      name: 'Leather Jacket',
      description: 'A premium leather jacket for an edgy look.',
      label: 'Luxury',
      brand: 'Gucci',
      stock: 15,
      image: 'https://via.placeholder.com/150',
      categoryId: 7,
      type: 'male',
      isFeatured: true,
      price: 299.99,
      currency: 'USD',
    },
    {
      id: 8,
      name: 'Summer Dress',
      description: 'A light and breezy dress for summer days.',
      label: 'Elegant',
      brand: 'H&M',
      stock: 35,
      image: 'https://via.placeholder.com/150',
      categoryId: 8,
      type: 'female',
      isFeatured: false,
      price: 49.99,
      currency: 'USD',
    },
    {
      id: 9,
      name: 'Woolen Scarf',
      description: 'Stay warm with this soft and stylish scarf.',
      label: 'Comfort',
      brand: 'Burberry',
      stock: 40,
      image: 'https://via.placeholder.com/150',
      categoryId: 9,
      type: 'unisex',
      isFeatured: true,
      price: 39.99,
      currency: 'USD',
      discount: 10,
    },
    {
      id: 10,
      name: 'Running Shoes',
      description: 'Shoes designed for performance and comfort.',
      label: 'Performance',
      brand: 'Asics',
      stock: 25,
      image: 'https://via.placeholder.com/150',
      categoryId: 10,
      type: 'male',
      isFeatured: false,
      price: 99.99,
      currency: 'USD',
    },
    {
      id: 11,
      name: 'Denim Jacket',
      description: 'A versatile jacket for casual wear.',
      label: 'Vintage',
      brand: 'Levi’s',
      stock: 30,
      image: 'https://via.placeholder.com/150',
      categoryId: 7,
      type: 'male',
      isFeatured: true,
      price: 69.99,
      currency: 'USD',
    },
    {
      id: 12,
      name: 'High-Heel Shoes',
      description: 'Elegant high-heel shoes for special occasions.',
      label: 'Exclusive',
      brand: 'Jimmy Choo',
      stock: 20,
      image: 'https://via.placeholder.com/150',
      categoryId: 8,
      type: 'female',
      isFeatured: false,
      price: 149.99,
      currency: 'USD',
    },
    {
      id: 13,
      name: 'Winter Coat',
      description: 'Stay warm with this stylish winter coat.',
      label: 'Premium',
      brand: 'The North Face',
      stock: 20,
      image: 'https://via.placeholder.com/150',
      categoryId: 4,
      type: 'unisex',
      isFeatured: false,
      price: 199.99,
      currency: 'USD',
    },
    {
      id: 14,
      name: 'Sunglasses',
      description: 'Protect your eyes with these stylish sunglasses.',
      label: 'Luxury',
      brand: 'Ray-Ban',
      stock: 45,
      image: 'https://via.placeholder.com/150',
      categoryId: 6,
      type: 'unisex',
      isFeatured: true,
      price: 129.99,
      currency: 'USD',
    },
    {
      id: 15,
      name: 'Formal Shirt',
      description: 'A formal shirt for office or formal events.',
      label: 'Classic',
      brand: 'Tommy Hilfiger',
      stock: 30,
      image: 'https://via.placeholder.com/150',
      categoryId: 1,
      type: 'male',
      isFeatured: false,
      price: 59.99,
      currency: 'USD',
    },
    {
      id: 16,
      name: 'Casual Shorts',
      description: 'Lightweight shorts perfect for summer.',
      label: 'Comfort',
      brand: 'Hollister',
      stock: 0,
      image: 'https://via.placeholder.com/150',
      categoryId: 5,
      type: 'male',
      isFeatured: true,
      price: 34.99,
      currency: 'USD',
    },
    {
      id: 17,
      name: 'Sports Bra',
      description: 'A supportive sports bra for active women.',
      label: 'Sport',
      brand: 'Nike',
      stock: 35,
      image: 'https://via.placeholder.com/150',
      categoryId: 3,
      type: 'female',
      isFeatured: false,
      price: 29.99,
      currency: 'USD',
    },
    {
      id: 18,
      name: 'Elegant Watch',
      description: 'A sleek and modern watch for all occasions.',
      label: 'Luxury',
      brand: 'Rolex',
      stock: 10,
      image: 'https://via.placeholder.com/150',
      categoryId: 11,
      type: 'unisex',
      isFeatured: true,
      price: 4999.99,
      currency: 'USD',
    },
    {
      id: 19,
      name: 'Rain Jacket',
      description: 'Stay dry and stylish in rainy weather.',
      label: 'Performance',
      brand: 'Columbia',
      stock: 25,
      image: 'https://via.placeholder.com/150',
      categoryId: 4,
      type: 'unisex',
      isFeatured: false,
      price: 89.99,
      currency: 'USD',
    },
    {
      id: 20,
      name: 'Elegant Necklace',
      description: 'A beautiful necklace for special occasions.',
      label: 'Exclusive',
      brand: 'Tiffany & Co.',
      stock: 15,
      image: 'https://via.placeholder.com/150',
      categoryId: 12,
      type: 'female',
      isFeatured: true,
      price: 299.99,
      currency: 'USD',
    },
  ];
  

  constructor() {}


  async getProducts(language: string, currency?: string, filters?: any): Promise<Product[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        let filteredProducts = [...this.products];

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

        const resolvedCurrency = currency || this.getDefaultCurrency(language);

        if (resolvedCurrency !== 'USD') {
          filteredProducts = filteredProducts.map((product) => ({
            ...product,
            price: this.convertCurrency(product.price, product.currency, resolvedCurrency),
            currency: resolvedCurrency,
          }));
        }

        resolve(filteredProducts);
      }, 500);
    });
  }


  async getFeaturedProducts(language: string, currency?: string): Promise<Product[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        let featuredProducts = this.products.filter((product) => product.isFeatured);

        const resolvedCurrency = currency || this.getDefaultCurrency(language);

        if (resolvedCurrency !== 'USD') {
          featuredProducts = featuredProducts.map((product) => ({
            ...product,
            price: this.convertCurrency(product.price, product.currency, resolvedCurrency),
            currency: resolvedCurrency,
          }));
        }

        resolve(featuredProducts);
      }, 500);
    });
  }


  private getDefaultCurrency(language: string): string {
    return this.defaultCurrencyByLanguage[language] || 'USD';
  }


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
