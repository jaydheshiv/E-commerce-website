import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ordered-products',
  templateUrl: './order-track.component.html',
  styleUrls: ['./order-track.component.css'],
})
export class OrderedProductsComponent implements OnInit {
  products: any[] = [];
  total: number = 0;

  ngOnInit(): void {
    // Load ordered products from localStorage
    this.products = JSON.parse(localStorage.getItem('checkout') || '[]');

    // Calculate total price of ordered products
    this.products.forEach(product => {
      this.total += product.price;
    });
  }
}
