import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

const options = {
  headers: new HttpHeaders(),
};

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  // to hold search key from header component
  searchKey = new BehaviorSubject('');
  wishlistMsg: string = '';
  apiWishlist: number[] = [];
  apiCart: number[] = [];
  products: any[] = [];
  cartCount = new BehaviorSubject<any[]>([]);
  private baseUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  //register
  register(username: any, email: any, password: any) {
    const body = {
      username,
      email,
      password,
    };
    // server call to register an account and return response to register component
    return this.http.post('http://localhost:3000/register', body);
  }

  //login
  login(email: any, password: any) {
    const body = {
      email,
      password,
    };
    // server call to register an account and return response to login component
    return this.http.post('http://localhost:3000/login', body);
  }

  //all products api
  getAllProducts() {
    return this.http.get('http://localhost:3000/all-products');
  }

  //view products api
  viewProduct(productId: any) {
    return this.http.get('http://localhost:3000/view-product/' + productId);
  }

  // appending token to http header
  appendToken() {
    // fetch token from local Storage
    const token = localStorage.getItem('token') || '';
    // create http header
    let headers = new HttpHeaders();
    if (token) {
      //append token inside http headers
      headers = headers.append('access-token', token);
      options.headers = headers;
    }
    return options;
  }

  //addToWishlist
  addToWishlist(email: any, productId: any) {
    const body = {
      email,
      productId,
    };
    return this.http.post(
      'http://localhost:3000/addToWishlist/',
      body,
      this.appendToken()
    );
  }

  //remove from wishlist
  removeFromWishlist(email: any, productId: any) {
    const body = {
      email,
      productId,
    };
    return this.http.put(
      'http://localhost:3000/removeFromWishlist/',
      body,
      this.appendToken()
    );
  }

  //addToCart
  addToCart(email: any, productId: any, count: any) {
    const body = {
      email,
      productId,
      count,
    };
    return this.http.post(
      'http://localhost:3000/addToCart/',
      body,
      this.appendToken()
    );
  }

  //updateCartItemCount
  updateCartItemCount(email: any, productId: any, count: any) {
    const body = {
      email,
      productId,
      count,
    };
    return this.http.put(
      'http://localhost:3000/updateCartItemCount/',
      body,
      this.appendToken()
    );
  }

  //remove from cart
  removeFromCart(email: any, productId: any) {
    const body = {
      email,
      productId,
    };
    return this.http.put(
      'http://localhost:3000/removeFromCart/',
      body,
      this.appendToken()
    );
  }

  //empty cart
  emptyCart(email: any) {
    const body = {
      email,
    };
    return this.http.put(
      'http://localhost:3000/emptyCart/',
      body,
      this.appendToken()
    );
  }

  //addToCheckout
  addToCheckout(
    email: any,
    orderID: any,
    transactionID: any,
    dateAndTime: any,
    amount: any,
    status: any,
    products: any,
    details: any
  ) {
    const body = {
      email,
      orderID,
      transactionID,
      dateAndTime,
      amount,
      status,
      products,
      details,
    };
    return this.http.post(
      'http://localhost:3000/addToCheckout/',
      body,
      this.appendToken()
    );
  }

  //addOrder
  addOrder(email: string, products: any[], total: number) {
    const body = {
      email,
      products,
      total,
    };
    return this.http.post(
      'http://localhost:3000/addOrder/',
      body,
      this.appendToken()
    );
  }

  getWishlist(email: any) {
    return this.http.get(
      'http://localhost:3000/getWishlist/' + email,
      this.appendToken()
    );
  }

  getMyOrders(email: any) {
    return this.http.get(
      'http://localhost:3000/getMyOrders/' + email,
      this.appendToken()
    );
  }

  getProducts(): Observable<any> {
    return this.http.get(`${this.baseUrl}/products`);
  }

  addProduct(product: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/products`, product);
  }

  deleteProduct(productId: any): Observable<any> {
    return this.http.delete(`${this.baseUrl}/products/${productId}`);
  }
}
