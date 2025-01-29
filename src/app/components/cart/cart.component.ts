import { Component, OnInit, OnDestroy } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { ShopService } from '../../services/shop.service';
import { Product } from '../../interfaces/interfaces';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { UserService } from '../../services/user.service';
import { ShippingAddress, Order } from '../../interfaces/interfaces';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: false,
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit, OnDestroy {
  cartItems: { product_id: number; quantity: number }[] = [];
  cartQuantityMap: { [productId: number]: number } = {};
  products: Product[] = [];
  cartRetrieved: boolean = false;
  showAddressForm: boolean = false;
  guestAddress : any;
  totalPrice: number = 0;
  paymentMethods = ['Credit Card', 'PayPal', 'Bank Transfer', 'Amazon Pay'];
  selectedPaymentMethod: string = '';
  shippingAddresses: ShippingAddress[] = [];
  selectedShippingAddress: string = ''; 
  showPaymentPopup = false;
  paymentStatus = '';
  checkoutErrorMessage = '';
  maskedCardNumber = '**** **** **** 1234';
  maskedExpiry = '**/**';
  maskedCVV = '***';

  private langChangeSubscription: Subscription = new Subscription();

  constructor(
    private cartService: CartService,
    private userService: UserService,
    private shopService: ShopService,
    private translate: TranslateService,
    private router: Router
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
        next: (addresses: ShippingAddress[]) => {
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
      },
      error: () => {
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
      },
    });
  }

  formatAddress(address: ShippingAddress): string {
    return `${address.address_line1}, ${address.address_line2 ? address.address_line2 + ', ' : ''}${address.city}, ${address.state} ${address.postal_code}, ${address.country}`;
  }
  
  addNewAddress(address: ShippingAddress): void {
    this.userService.addShippingAddress(address).subscribe({
      next: (response) => {
        this.shippingAddresses.push(response.shippingAddress);
        this.showAddressForm = false;
      }
    });
  }
  
  saveGuestAddress(address: ShippingAddress): void {
    this.guestAddress = address;
  }

  openPaymentPopup(): void {
    if (!this.isCheckoutReady) {
      this.checkoutErrorMessage = 'Seleziona un metodo di pagamento e un indirizzo di spedizione.';
      return;
    }
  
    this.createOrder()!.subscribe({
      next: (response) => {
        if (response && response.order_id) {
          localStorage.setItem('lastOrderId', response.order_id.toString());
  
          this.cartService.updateCart([]);
  
          this.showPaymentPopup = true;
          this.translate.get('CART.PAYMENT_ENTERING_DATA').subscribe((res) => {
            this.paymentStatus = res;
          });
  
          setTimeout(() => {
            this.translate.get('CART.PAYMENT_VALIDATING').subscribe((res) => {
              this.paymentStatus = res;
            });
          }, 1500);
  
          setTimeout(() => {
            this.translate.get('CART.PAYMENT_AUTHORIZING').subscribe((res) => {
              this.paymentStatus = res;
            });
          }, 3000);
  
          setTimeout(() => {
            this.translate.get('CART.PAYMENT_SUCCESS').subscribe((res) => {
              this.paymentStatus = res;
            });
  
            setTimeout(() => this.redirectToOrderSummary(), 2000);
          }, 4500);
        } else {
          console.error('Errore: la risposta non contiene un order_id valido.');
        }
      },
      error: (err) => {
        console.error('Errore durante la creazione dell\'ordine:', err);
      }
    });
  }
  
  
  createOrder() {  
    const selectedAddressObj = this.shippingAddresses.find(addr => addr.id === Number(this.selectedShippingAddress));
    if (!selectedAddressObj) {
      console.error('Indirizzo di spedizione non trovato.');
      return;
    }
    if (!this.cartItems || this.cartItems.length === 0) {
      console.error("ERRORE: cartItems è vuoto o undefined!");
      return;
    }
    const orderData: Order = {
      total_price: this.totalPrice,
      payment_method: this.selectedPaymentMethod,
      shipping_address: this.formatAddress(selectedAddressObj),
      cartItems: this.cartItems.map(item => ({
        product_id: item.product_id,
        quantity: item.quantity,
        price: this.products.find(p => p.id === item.product_id)?.price || 0
      }))
    };  
    return this.userService.createOrder(orderData);
  }
  

  closePaymentPopup(): void {
    this.showPaymentPopup = false;
  }

  redirectToOrderSummary(): void {
    this.router.navigate(['/order-summary']);
  }

  get isCheckoutReady(): boolean {
    return !!this.selectedPaymentMethod && !!this.selectedShippingAddress;
  }

  ngOnDestroy(): void {
    if (this.langChangeSubscription) {
      this.langChangeSubscription.unsubscribe();
    }
  }
}
