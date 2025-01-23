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
  categories = [
    { id: 1, name: 'Abbigliamento' },
    { id: 2, name: 'Accessori' },
    { id: 3, name: 'Scarpe' },
  ];
  brands: string[] = [];
  filters = {
    categoryId: '',
    type: '',
    minPrice: null as number | null,
    maxPrice: null as number | null,
    hasDiscount: false,
    brand: '',
    isFeatured: false,
    excludeOutOfStock: false,
  };
  sorting: 'priceAsc' | 'priceDesc' | 'nameAsc' | 'nameDesc' = 'priceAsc';
  currentPage = 1;
  pageSize = 9;
  totalPages: number[] = [];
  isLoading = false;

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

    if (this.filters.categoryId) {
      filtered = filtered.filter(
        (product) => product.categoryId === +this.filters.categoryId
      );
    }

    if (this.filters.type) {
      filtered = filtered.filter((product) => product.type === this.filters.type);
    }

    if (this.filters.minPrice != null) {
      filtered = filtered.filter((product) => product.price >= this.filters.minPrice!);
    }
    if (this.filters.maxPrice != null) {
      filtered = filtered.filter((product) => product.price <= this.filters.maxPrice!);
    }

    if (this.filters.hasDiscount) {
      filtered = filtered.filter(
        (product) => product.discount !== undefined && product.discount > 0
      );
    }

    if (this.filters.brand) {
      filtered = filtered.filter((product) => product.brand === this.filters.brand);
    }

    if (this.filters.isFeatured) {
      filtered = filtered.filter((product) => product.isFeatured);
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
}
