import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../interfaces/interfaces';
import { ShopService } from '../../services/shop.service';
import { Subscription } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-product',
  standalone: false,
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit, OnDestroy {
  product!: Product;
  selectedSize: string = ''; // Variabile per memorizzare la taglia selezionata
  isLoading: boolean = true;
  private langChangeSubscription: Subscription = new Subscription();

  constructor(
    private translate: TranslateService,
    private shopService: ShopService,
    private route: ActivatedRoute,
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
      next: (Product: Product) => {
        this.product = Product;
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      }
    });
  }

  get originalPrice(): number {
    return this.product.discount ? this.product.price / (1 - this.product.discount / 100) : this.product.price;
  }

  // Gestisce la selezione della taglia
  selectSize(size: string): void {
    this.selectedSize = size; // Memorizza la taglia selezionata
    console.log('Taglia selezionata:', size);
  }

  // Aggiungi al carrello con la taglia selezionata
  addToCart(): void {
    if (this.selectedSize) {
      console.log(`Aggiunto al carrello: ${this.product.name}, Taglia: ${this.selectedSize}`);
      // Aggiungi logica per aggiungere al carrello
    } else {
      console.log('Seleziona una taglia prima di aggiungere al carrello.');
    }
  }

  addToFavorites(): void {
    console.log('Aggiunto ai preferiti:', this.product.name);
    // Aggiungi logica per aggiungere ai preferiti
  }

  ngOnDestroy(): void {
    if (this.langChangeSubscription) {
      this.langChangeSubscription.unsubscribe();
    }
  }
}
