import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { ShopService } from '../../services/shop.service';
import { Product } from '../../interfaces/interfaces';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cart',
  standalone: false,
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  cartItems: { product_id: number; quantity: number }[] = [];
  cartQuantityMap: { [productId: number]: number } = {};
  products: Product[] = [];
  cartRetrieved: boolean = false;
  error: string | null = null;
  private langChangeSubscription: Subscription = new Subscription();

  constructor(
    private cartService: CartService,
    private shopService: ShopService,
    private translate: TranslateService,
  ) {}

  ngOnInit(): void {
    if (this.isLoggedIn()) {
      this.loadCart();
    }

    this.langChangeSubscription = this.translate.onLangChange.subscribe(() => {
      if (this.isLoggedIn()) {
        this.loadCart();
      }
    });
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('accessToken');
  }

  loadCart(): void {
    this.error = null;
    this.cartService.getCart().subscribe({
      next: (cart) => {
        this.cartItems = cart;
        this.cartQuantityMap = this.mapQuantities(cart);
        const productIds = cart.map((item) => item.product_id);

        if (productIds.length > 0) {
          this.loadProductDetails(productIds);
        } else {
          this.cartRetrieved = true;
        }
      },
      error: (error) => {
        console.error('Errore durante il caricamento del carrello:', error);
        this.error = 'CART.ERROR_LOADING';
        this.cartRetrieved = true;
      },
    });
  }

  loadProductDetails(productIds: number[]): void {
    const currentLang = this.translate.currentLang || this.translate.defaultLang;
    this.shopService.getProductsByIds(currentLang, productIds).subscribe({
      next: (products) => {
        this.products = products;
        this.cartRetrieved = true;
      },
      error: (error) => {
        console.error('Errore durante il caricamento dei dettagli dei prodotti:', error);
        this.error = 'CART.ERROR_PRODUCTS';
        this.cartRetrieved = true;
      },
    });
  }

  mapQuantities(cartItems: { product_id: number; quantity: number }[]): { [productId: number]: number } {
    const map: { [productId: number]: number } = {};
    cartItems.forEach((item) => {
      map[item.product_id] = item.quantity;
    });
    return map;
  }

  ngOnDestroy(): void {
    if (this.langChangeSubscription) {
      this.langChangeSubscription.unsubscribe();
    }
  }
}
