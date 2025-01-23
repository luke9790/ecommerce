import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-product-card',
  standalone: false,
  
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss'
})
export class ProductCardComponent {

  @Input() name!: string;
  @Input() description!: string;
  @Input() price!: number;
  @Input() currency!: string;
  @Input() imageSrc!: string;
  @Input() label!: string;
}
