import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ShopService } from '../../services/shop.service';
import { Product } from '../../interfaces/interfaces';
import { Subscription } from 'rxjs';

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

  constructor(private translate: TranslateService, private shopService: ShopService) {}

  ngOnInit(): void {
    this.loadFeaturedProducts();
    this.langChangeSubscription = this.translate.onLangChange.subscribe(() => {
      this.loadFeaturedProducts();
    });
  }

  loadFeaturedProducts(): void {
    this.isLoading = true;
    const currentLang = this.translate.currentLang || this.translate.defaultLang;
    
    // Passa la lingua e i filtri al servizio
    this.shopService.getFeaturedProducts(currentLang).subscribe({
      next: (featuredProducts: Product[]) => {
        this.products = featuredProducts.slice(0, 8); // Limita a 8 prodotti
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
        // Gestisci gli errori se necessario, per esempio mostrando un messaggio all'utente
      }
    });
  }

  ngOnDestroy(): void {
    // Assicurati di annullare l'abbonamento quando il componente viene distrutto
    if (this.langChangeSubscription) {
      this.langChangeSubscription.unsubscribe();
    }
  }
}
