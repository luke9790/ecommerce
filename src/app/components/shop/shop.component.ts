import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ShopService } from '../../services/shop.service';
import { Product } from '../../interfaces/interfaces';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  standalone: false,
  styleUrls: ['./shop.component.scss'],
})
export class ShopComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  paginatedProducts: Product[] = [];
  brands: string[] = [];
  isLoading = false;
  lastAppliedCategoryId: number | null = null;
  debounceTimer: any;

  filters = {
    categoryId: null as number | null,
    subCategoryId: null as number | null,
    minPrice: null as number | null,
    maxPrice: null as number | null,
    brand: '',
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
  

  constructor(
    private translate: TranslateService,
    private shopService: ShopService
  ) {}

  ngOnInit(): void {
    this.loadProducts();
    this.translate.onLangChange.subscribe(() => {
      this.loadProducts();
    });
  }

  async loadProducts(): Promise<void> {
    this.isLoading = true;
    const currentLang = this.translate.currentLang || this.translate.defaultLang;
    const allProducts = await this.shopService.getProducts(currentLang);

    this.products = allProducts;
    this.brands = Array.from(new Set(allProducts.map((product) => product.brand)));

    this.isLoading = false;
    this.applyFilters();
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
      minPrice: null,
      maxPrice: null,
      brand: '',
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
  
  
}
