import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ShopService } from '../../services/shop.service';
import { Product } from '../../interfaces/interfaces';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-featured-products',
  standalone: false,
  templateUrl: './featured-products.component.html',
  styleUrls: ['./featured-products.component.scss'],
})
export class FeaturedProductsComponent implements OnInit {
  products: Product[] = [];
  isLoading: boolean = true;
  private langChangeSubscription: Subscription = new Subscription();

  constructor(
    private translate: TranslateService,
    private shopService: ShopService,
    private router: Router,
    private authService: AuthService 
  ) {}

  ngOnInit(): void {
    this.loadFeaturedProducts();
    this.langChangeSubscription = this.translate.onLangChange.subscribe(() => {
      this.loadFeaturedProducts();
    });
    this.authService.isAuthenticated$.subscribe(() => {
      this.loadFeaturedProducts();
    });
  }

  loadFeaturedProducts(): void {
    this.isLoading = true;
    const currentLang = this.translate.currentLang || this.translate.defaultLang;
    
    this.shopService.getFeaturedProducts(currentLang).subscribe({
      next: (featuredProducts: Product[]) => {
        this.products = featuredProducts.slice(0, 8);
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      }
    });
  }

  viewAll(): void {
    this.router.navigate(['/shop'], { state: { showOnlyFeatured: true } });
  }

  ngOnDestroy(): void {
    if (this.langChangeSubscription) {
      this.langChangeSubscription.unsubscribe();
    }
  }
}
