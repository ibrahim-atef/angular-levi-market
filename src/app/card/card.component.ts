import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CartService } from '../requests/cart.service';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent {
  @Input() product: any;
  cartItems: number[] = [];
  rating!: number;
  amount: number = 0;

  constructor(private router: Router, private cart: CartService) {}

  ngOnInit() {
    this.rating = Math.round(this.product.rating);
    this.cart.getCart().subscribe((data) => (this.cartItems = data));
  }

  stars = [1, 2, 3, 4, 5]; // Stars array for the custom rating

  redirectToDetails(id: number) {
    this.router.navigate([`/product-detail/${id}`]);
  }

  addToCart(id: number) {
    this.cartItems.push(id);
    this.cart.updateCart(this.cartItems);
    this.amount += 1;
  }
}
