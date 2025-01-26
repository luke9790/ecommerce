import { Component, Input } from '@angular/core';

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
  @Input() stock!: number; // Disponibilità
  @Input() brand?: string; // Brand del prodotto
  @Input() discount?: number; // Sconto (in percentuale)

  // Calcolo del prezzo originale (se presente uno sconto)
  get originalPrice(): number {
    return this.discount ? this.price / (1 - this.discount / 100) : this.price;
  }

  addToFavorites(){
    console.log("AGGiutno")
  }

  addToCart(){

  }
}
