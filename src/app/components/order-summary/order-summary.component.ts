import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-summary',
  standalone: false,
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.scss'],
})
export class OrderSummaryComponent implements OnInit {
  lastOrder: any = null;
  loading: boolean = true;
  errorMessage: string = '';

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.loadLastOrder();
  }

  loadLastOrder(): void {
    this.userService.getUserOrders().subscribe({
      next: (orders) => {
        if (orders.length === 0) {
          this.errorMessage = 'Nessun ordine trovato.';
        } else {
          this.lastOrder = orders.reduce((latest, order) =>
            order.id! > latest.id! ? order : latest
          );
        }
  
        this.loading = false;
      },
      error: () => {
        this.errorMessage = 'Errore nel recupero dell’ordine.';
        this.loading = false;
      },
    });
  }
  
  

  goToShop(): void {
    this.router.navigate(['/shop']);
  }
}
