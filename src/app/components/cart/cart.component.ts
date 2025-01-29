import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { ShopService } from '../../services/shop.service';
import { Product } from '../../interfaces/interfaces';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { UserService } from '../../services/user.service';

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
  totalPrice: number = 0;
  paymentMethods = ['Credit Card', 'PayPal', 'Bank Transfer', 'Amazon Pay'];
  selectedPaymentMethod: string = '';
  shippingAddresses: string[] = []; 
  private langChangeSubscription: Subscription = new Subscription();

  constructor(
    private cartService: CartService,
    private userService: UserService,
    private shopService: ShopService,
    private translate: TranslateService,
  ) {}

  ngOnInit(): void {
    if (this.isLoggedIn()) {
      this.loadCart();
      this.loadUserAddresses();
    }
  
    this.langChangeSubscription = this.translate.onLangChange.subscribe(() => {
      if (this.isLoggedIn()) {
        this.loadCart();
        this.loadUserAddresses();
      }
    });
  }

  isLoggedIn(): boolean {
    const token = localStorage.getItem('accessToken');
    return !!token;
  }

  loadCart(): void {
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
      error: () => {
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

  loadProductDetails(productIds: number[]): void {
    const currentLang = this.translate.currentLang || this.translate.defaultLang;
  
    this.shopService.getProductsByIds(currentLang, productIds).subscribe({
      next: (products) => {
        this.products = products;
        this.calculateTotal();
        this.cartRetrieved = true;
      },
      error: () => {
        this.cartRetrieved = true;
      },
    });
  }

  calculateTotal(): void {
    this.totalPrice = this.products.reduce((total, product) => {
      return total + (product.price * (this.cartQuantityMap[product.id] || 0));
    }, 0);
  }
  
  loadUserAddresses(): void {
    if (this.isLoggedIn()) {
      this.userService.getUserAddresses().subscribe({
        next: (addresses) => {
          this.shippingAddresses = addresses;
        },
        error: () => {
          this.shippingAddresses = [];
        },
      });
    }
  }

  updateQuantity(productId: number, event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const newQuantity = Math.max(1, parseInt(inputElement.value, 10));
    this.cartQuantityMap[productId] = newQuantity;

    const updatedCartItems = Object.entries(this.cartQuantityMap).map(([id, quantity]) => ({
      product_id: parseInt(id, 10),
      quantity: quantity as number,
    }));

    this.cartService.updateCart(updatedCartItems).subscribe({
      next: () => {
        // Quantità aggiornata con successo
      },
      error: () => {
        // Errore durante l'aggiornamento
      },
    });
  }

  removeProduct(productId: number): void {
    this.cartService.removeFromCart([{ product_id: productId, quantity: this.cartQuantityMap[productId] }]).subscribe({
      next: () => {
        delete this.cartQuantityMap[productId];
        this.products = this.products.filter((product) => product.id !== productId);
      },
      error: () => {
        // Errore durante la rimozione
      },
    });
  }

  ngOnDestroy(): void {
    if (this.langChangeSubscription) {
      this.langChangeSubscription.unsubscribe();
    }
  }
}
