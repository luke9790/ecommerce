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
  @Input() stock!: number;
  @Input() brand?: string;
  @Input() discount?: number; 

  get originalPrice(): number {
    return this.discount ? this.price / (1 - this.discount / 100) : this.price;
  }

  addToFavorites(){
    console.log("Aggiunto ai favoriti")
  }

  addToCart(){
    console.log("Aggiunto al carrello")
  }
}
