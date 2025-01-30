import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FavoritesService } from '../../services/favorites.service';
import { CartService } from '../../services/cart.service';
import { AuthService } from '../../services/auth.service'; // Importa AuthService

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
  isAddedToCart: boolean = false;
  isAuthenticated: boolean = false;

  constructor(
    private favoritesService: FavoritesService,
    private cartService: CartService,
    private authService: AuthService // Iniettiamo AuthService
  ) {}

  get originalPrice(): number {
    return this.discount ? this.price / (1 - this.discount / 100) : this.price;
  }

  ngOnInit(): void {
    // Controlla se l'utente è autenticato
    this.isAuthenticated = this.authService.isLoggedIn();

    // Se l'utente è autenticato, controlla se il prodotto è tra i preferiti
    if (this.isAuthenticated) {
      this.checkIfFavorite();
    }
  }

  checkIfFavorite(): void {
    this.favoritesService.getFavorites().subscribe({
      next: (favorites) => {
        this.isFavorite = favorites.includes(this.id);
      },
      error: (err) => {
        console.error('Errore nel recupero dei preferiti:', err);
      }
    });
  }

  toggleFavorite(): void {
    if (!this.isAuthenticated) {
      return;
    }

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
      this.cartService.addToCart(this.id, 1).subscribe({
        next: () => {
          this.isAddedToCart = true;
          setTimeout(() => (this.isAddedToCart = false), 2000);
        },
      });
    }
  }
}
