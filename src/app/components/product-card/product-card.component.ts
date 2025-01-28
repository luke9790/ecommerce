import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FavoritesService } from '../../services/favorites.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-product-card',
  standalone: false,
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent {
  @Input() id!: number;
  @Input() name!: string;
  @Input() description!: string;
  @Input() price!: number;
  @Input() currency!: string;
  @Input() imageSrc!: string;
  @Input() label!: string;
  @Input() stock!: number;
  @Input() brand?: string;
  @Input() discount?: number; 

  @Output() remove = new EventEmitter<number>();

  isFavorite: boolean = false;

  constructor(
    private favoritesService: FavoritesService,
    private cartService: CartService
  ) {}

  get originalPrice(): number {
    return this.discount ? this.price / (1 - this.discount / 100) : this.price;
  }

  ngOnInit(): void {
    this.checkIfFavorite();
  }

  checkIfFavorite(): void {
    this.favoritesService.getFavorites().subscribe((favorites) => {
      this.isFavorite = favorites.includes(this.id);
    });
  }

  toggleFavorite(): void {
    if (this.isFavorite) {
      this.favoritesService.removeFavorite(this.id).subscribe(() => {
        this.isFavorite = false;
        this.remove.emit(this.id); 
      });
    } else {
      this.favoritesService.addFavorite(this.id).subscribe(() => {
        this.isFavorite = true;
      });
    }
  }

  addToCart(): void {
    if (this.stock > 0) {
      this.cartService.addToCart(this.id, 1)
    }
  }

}

