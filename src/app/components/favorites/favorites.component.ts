import { Component, OnInit, OnDestroy } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ShopService } from '../../services/shop.service';
import { Product } from '../../interfaces/interfaces';
import { Subscription } from 'rxjs';
import { FavoritesService } from '../../services/favorites.service';

@Component({
  selector: 'app-favorites',
  standalone: false,
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.scss'
})
export class FavoritesComponent implements OnInit, OnDestroy {
  favoriteIds: any[] = [];
  favoriteProducts: any[] = [];
  products: Product[] = [];
  filteredProducts: Product[] = [];
  paginatedProducts: Product[] = [];
  brands: string[] = [];
  labels: string[] = [];
  isLoading = false;
  debounceTimer: any;

  sorting: 'priceAsc' | 'priceDesc' | 'nameAsc' | 'nameDesc' = 'priceAsc';
  currentPage = 1;
  pageSize = 9;
  totalPages: number[] = [];

  private langChangeSubscription: Subscription = new Subscription();

  constructor(
    private translate: TranslateService,
    private shopService: ShopService,
    private favoriteService: FavoritesService
  ) {}

  ngOnInit(): void {
    this.loadFavorites();
    this.langChangeSubscription = this.translate.onLangChange.subscribe(() => {
      this.loadProductDetails(this.favoriteIds);
    });
  }
  
  loadFavorites(): void {
    this.favoriteService.getFavorites().subscribe({
      next: (fav) => { 
        this.favoriteIds = fav;
        this.loadProductDetails(this.favoriteIds);
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Errore durante il caricamento dei preferiti:', error);
        this.isLoading = false;
      },
    });
  }
  
  loadProductDetails(productIds: number[]): void {
    this.isLoading = true;
    const currentLang = this.translate.currentLang || this.translate.defaultLang;
    this.shopService.getProductsByIds(currentLang, productIds).subscribe({
      next: (allProducts: Product[]) => {
        this.favoriteProducts = allProducts;
        this.brands = Array.from(new Set(allProducts.map((product) => product.brand)));
        this.labels = Array.from(new Set(allProducts.map((product) => product.label)));
        this.isLoading = false;
        this.applyFilters();
      },
      error: () => {
        this.isLoading = false;
      }
    });
  }
  

  applyFilters(): void {
    let filtered = [...this.favoriteProducts];
    this.applySorting(filtered);
  }

  applySorting(products: Product[]): void {
    const sortMap = {
      priceAsc: (a: Product, b: Product) => a.price - b.price,
      priceDesc: (a: Product, b: Product) => b.price - a.price,
      nameAsc: (a: Product, b: Product) => a.name.localeCompare(b.name),
      nameDesc: (a: Product, b: Product) => b.name.localeCompare(a.name),
    };

    this.filteredProducts = products.sort(sortMap[this.sorting]);
    this.paginate();
  }

  paginate(): void {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;

    this.totalPages = Array(Math.ceil(this.filteredProducts.length / this.pageSize))
      .fill(0)
      .map((_, i) => i + 1);

    this.paginatedProducts = this.filteredProducts.slice(start, end);
  }

  changePage(pageNumber: number): void {
    this.currentPage = pageNumber;
    this.paginate();
  }

  ngOnDestroy(): void {
    if (this.langChangeSubscription) {
      this.langChangeSubscription.unsubscribe();
    }
  }
}
