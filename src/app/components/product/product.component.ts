import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../interfaces/interfaces';
import { ShopService } from '../../services/shop.service';
import { FavoritesService } from '../../services/favorites.service';
import { CartService } from '../../services/cart.service';
import { Subscription } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-product',
  standalone: false,
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit, OnDestroy {
  product!: Product;
  selectedSize: string = '';
  isLoading: boolean = true;
  isFavorite: boolean = false;
  isAddedToCart: boolean = false;
  isAuthenticated: boolean = false;
  private langChangeSubscription: Subscription = new Subscription();

  constructor(
    private translate: TranslateService,
    private shopService: ShopService,
    private favoritesService: FavoritesService,
    private cartService: CartService,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const productId = +this.route.snapshot.paramMap.get('id')!;
    this.loadProduct(productId);

    this.langChangeSubscription = this.translate.onLangChange.subscribe(() => {
      this.loadProduct(productId);
    });
  }

  loadProduct(productId: number): void {
    this.isLoading = true;
    const currentLang = this.translate.currentLang || this.translate.defaultLang;

    this.shopService.getProductById(currentLang, productId).subscribe({
      next: (product: Product) => {
        console.log(product);
        this.product = product;
        this.isLoading = false;
        this.isAuthenticated = this.authService.isLoggedIn();
        if (this.isAuthenticated) {
          this.checkIfFavorite();
        }
      },
      error: () => {
        this.isLoading = false;
      }
    });
  }

  get originalPrice(): number {
    return this.product.discount ? this.product.price / (1 - this.product.discount / 100) : this.product.price;
  }

  selectSize(size: string): void {
    this.selectedSize = size;
  }

  addToCart(): void {
    if (this.product.stock > 0) {
      this.cartService.addToCart(this.product.id, 1).subscribe({
        next: () => {
          this.isAddedToCart = true;
          setTimeout(() => (this.isAddedToCart = false), 2000);
        },
      });
    }
  }

  checkIfFavorite(): void {
    this.favoritesService.getFavorites().subscribe((favorites) => {
      this.isFavorite = favorites.includes(this.product.id);
    });
  }

  toggleFavorite(): void {
    if (this.isFavorite) {
      this.favoritesService.removeFavorite(this.product.id).subscribe(() => {
        this.isFavorite = false;
      });
    } else {
      this.favoritesService.addFavorite(this.product.id).subscribe(() => {
        this.isFavorite = true;
      });
    }
  }

  ngOnDestroy(): void {
    if (this.langChangeSubscription) {
      this.langChangeSubscription.unsubscribe();
    }
  }
}
