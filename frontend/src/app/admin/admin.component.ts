import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  newProduct = { id: 0, title: '', price: 0, description: '', category: '', image: '', rating: { rate: 0, count: 0 } };
  products: any[] = [];
  adminPassword: string = '';
  isAuthenticated: boolean = false;
  private readonly correctPassword: string = 'jay';

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    if (this.isAuthenticated) {
      this.getProducts();
    }
  }

  checkPassword(): void {
    if (this.adminPassword === this.correctPassword) {
      this.isAuthenticated = true;
      this.getProducts();
    } else {
      alert('Incorrect password');
    }
  }

  getProducts(): void {
    this.api.getProducts().subscribe((data: any) => {
      this.products = data;
    });
  }

  addProduct(): void {
    this.api.addProduct(this.newProduct).subscribe((result: any) => {
      console.log(result);
      this.getProducts();
      this.newProduct = { id: 0, title: '', price: 0, description: '', category: '', image: '', rating: { rate: 0, count: 0 } };
    });
  }

  deleteProduct(productId: any): void {
    this.api.deleteProduct(productId).subscribe((result: any) => {
      console.log(result);
      this.getProducts();
    });
  }
}