import { Component, OnInit, OnDestroy } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ShopService } from '../../services/shop.service';
import { Product } from '../../interfaces/interfaces';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  standalone: false,
  styleUrls: ['./shop.component.scss'],
})
export class ShopComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  paginatedProducts: Product[] = [];
  brands: string[] = [];
  labels: string[] = [];
  isLoading = false;
  lastAppliedCategoryId: number | null = null;
  debounceTimer: any;

  filters = {
    categoryId: null as number | null,
    subCategoryId: null as number | null,
    minPrice: 0 as number,
    maxPrice: 5000 as number,
    brand: '',
    label: '',
    isFeatured: false,
    discount: false,
    type: '',  
    excludeOutOfStock: false,
  };

  sliderOptions = {
    floor: 0,
    ceil: 5000,
    step: 1,
    showSelectionBar: true,
    getSelectionBarColor: () => '#2196F3',
    getPointerColor: () => '#2196F3',
    
  };

  sorting: 'priceAsc' | 'priceDesc' | 'nameAsc' | 'nameDesc' = 'priceAsc';
  currentPage = 1;
  pageSize = 9;
  totalPages: number[] = [];

  categories: Record<number, { name: string; subCategories: Record<number, string> }> = {
    1: { name: 'T-shirts', subCategories: { 101: 'Basic', 102: 'Formal', 103: 'Sportswear' } },
    2: { name: 'Pants', subCategories: { 201: 'Jeans', 202: 'Jogging Pants', 203: 'Shorts' } },
    3: { name: 'Shoes', subCategories: { 301: 'Sneakers', 302: 'Running Shoes', 303: 'High Heels' } },
    4: { name: 'Hoodies', subCategories: { 401: 'Hoodies', 402: 'Sweaters', 403: 'Zipper Jackets' } },
    6: { name: 'Accessories', subCategories: { 601: 'Caps', 602: 'Scarves', 603: 'Sunglasses', 604: 'Watches', 605: 'Necklaces' } },
    7: { name: 'Jackets', subCategories: { 701: 'Leather Jackets', 702: 'Denim Jackets', 703: 'Winter Coats', 704: 'Rain Jackets' } },
    8: { name: 'Dresses', subCategories: { 801: 'Summer Dresses' } },
  };

  private langChangeSubscription: Subscription = new Subscription();

  constructor(
    private translate: TranslateService,
    private shopService: ShopService
  ) {}

  ngOnInit(): void {
    this.loadProducts();
    this.langChangeSubscription = this.translate.onLangChange.subscribe(() => {
      this.loadProducts();
    });
  }

  loadProducts(): void {
    this.isLoading = true;
    const currentLang = this.translate.currentLang || this.translate.defaultLang;
    this.shopService.getProducts(currentLang).subscribe({
      next: (allProducts: Product[]) => {
        this.products = allProducts;
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
    let filtered = [...this.products];

    if (this.filters.categoryId !== this.lastAppliedCategoryId) {
      this.filters.subCategoryId = null;
      this.lastAppliedCategoryId = this.filters.categoryId;
    }

    if (this.filters.categoryId) {
      filtered = filtered.filter((product) => product.categoryId == this.filters.categoryId);
    }

    if (this.filters.subCategoryId) {
      filtered = filtered.filter((product) => product.subCategoryId == this.filters.subCategoryId);
    }

    if (this.filters.minPrice != null) {
      filtered = filtered.filter((product) => product.price >= this.filters.minPrice!);
    }
    if (this.filters.maxPrice != null) {
      filtered = filtered.filter((product) => product.price <= this.filters.maxPrice!);
    }

    if (this.filters.brand) {
      filtered = filtered.filter((product) => product.brand === this.filters.brand);
    }

    if (this.filters.label) {
      filtered = filtered.filter((product) => product.label === this.filters.label);
    }

    if (this.filters.isFeatured) {
      filtered = filtered.filter((product) => product.isFeatured);
    }

    if (this.filters.discount) {
      filtered = filtered.filter((product) => product.discount && product.discount > 0);
    }

    if (this.filters.type) {
      filtered = filtered.filter((product) => product.type === this.filters.type);
    }

    if (this.filters.excludeOutOfStock) {
      filtered = filtered.filter((product) => product.stock > 0);
    }

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

  resetFilters(): void {
    this.filters = {
      categoryId: null,
      subCategoryId: null,
      minPrice: 0,
      maxPrice: 5000,
      brand: '',
      label: '',
      isFeatured: false,
      discount: false,
      type: '',
      excludeOutOfStock: false,
    };
    this.currentPage = 1;
    this.applyFilters();
  }

  allowOnlyNumbers(event: KeyboardEvent): void {
    const allowedKeys = [
      '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
      'Backspace', 'ArrowLeft', 'ArrowRight', 'Delete',
      'Tab'
    ];

    if (!allowedKeys.includes(event.key)) {
      event.preventDefault();
    }
  }

  debouncedApplyFilters(): void {
    clearTimeout(this.debounceTimer);
    this.debounceTimer = setTimeout(() => {
      this.applyFilters();
    }, 300);
  }

  ngOnDestroy(): void {
    if (this.langChangeSubscription) {
      this.langChangeSubscription.unsubscribe();
    }
  }
}
