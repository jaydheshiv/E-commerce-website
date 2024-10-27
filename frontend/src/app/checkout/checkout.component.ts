import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
  products: any[] = [];
  total: number = 0;
  name: string = '';
  email: string = '';
  mobile: string = '';
  address: string = '';
  btnprintHide: any;
  successMsg: any;

  constructor(private api: ApiService, private router: Router) {}

  ngOnInit(): void {
    // Load user data from localStorage
    this.name = localStorage.getItem('name') || '';
    this.email = localStorage.getItem('email') || '';
    this.mobile = localStorage.getItem('mobile') || '';
    this.address = localStorage.getItem('address') || '';
    this.products = JSON.parse(localStorage.getItem('checkout') || '[]');

    // Calculate total
    this.products.forEach(product => {
      this.total += product.price;
    });
  }

  // PDF generation method
  generatePdf() {
    const doc = new jsPDF();

    // Add title
    doc.setFontSize(18);
    doc.text('Order Summary', 10, 10);

    // Add customer details
    doc.setFontSize(12);
    doc.text(`Name: ${this.name}`, 10, 20);
    doc.text(`Email: ${this.email}`, 10, 30);
    doc.text(`Mobile: ${this.mobile}`, 10, 40);
    doc.text(`Address: ${this.address}`, 10, 50);

    // Add table headers
    const headers = ['Product', 'Count', 'Price'];
    const startY = 60; // Start position for the table
    let rowHeight = 10; // Height of each row

    // Draw headers
    doc.setFontSize(12);
    headers.forEach((header, index) => {
      doc.text(header, 10 + index * 50, startY);
    });

    // Draw product rows
    this.products.forEach((product, index) => {
      const rowY = startY + (index + 1) * rowHeight;
      doc.text(product.title, 10, rowY);
      doc.text(product.count.toString(), 60, rowY);
      doc.text(`$${product.price}`, 110, rowY);
    });

    // Add total amount below the table
    const totalY = startY + (this.products.length + 1) * rowHeight + 10; // Calculate Y position for total
    doc.text(`Total: $${this.total}`, 10, totalY);

    // Save the PDF
    doc.save('Order_Summary.pdf');

    // Add the order to the order track
    this.api.addOrder(this.email, this.products, this.total).subscribe(
      (result: any) => {
        console.log('Order added successfully', result);
        this.successMsg = 'Order added successfully!';
      },
      (error: any) => {
        console.log('Error adding order', error);
        this.successMsg = 'Error adding order!';
      }
    );
  }
}
