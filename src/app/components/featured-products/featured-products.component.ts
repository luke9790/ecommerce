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

  constructor(private translate: TranslateService, private shopService: ShopService) {}

  ngOnInit(): void {
    this.loadFeaturedProducts();

    // Aggiorna i prodotti in evidenza quando cambia la lingua
    this.translate.onLangChange.subscribe(() => {
      this.loadFeaturedProducts();
    });
  }

  async loadFeaturedProducts(): Promise<void> {
    const currentLang = this.translate.currentLang || this.translate.defaultLang;
    this.products = await this.shopService.getFeaturedProducts(currentLang);
  }
}
