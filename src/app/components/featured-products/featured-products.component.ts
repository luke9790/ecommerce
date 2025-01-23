import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ShopService } from '../../services/shop.service';
import { Product } from '../../interfaces/interfaces';

@Component({
  selector: 'app-featured-products',
  standalone: false,
  templateUrl: './featured-products.component.html',
  styleUrls: ['./featured-products.component.scss'],
})
export class FeaturedProductsComponent implements OnInit {
  products: Product[] = [];
  isLoading: boolean = true;

  constructor(private translate: TranslateService, private shopService: ShopService) {}

  ngOnInit(): void {
    this.loadFeaturedProducts();

    this.translate.onLangChange.subscribe(() => {
      this.loadFeaturedProducts();
    });
  }

  async loadFeaturedProducts(): Promise<void> {
    this.isLoading = true;
    const currentLang = this.translate.currentLang || this.translate.defaultLang;
    const allFeaturedProducts = await this.shopService.getFeaturedProducts(currentLang);

    this.products = allFeaturedProducts.slice(0, 8);
    this.isLoading = false;
  }
}
