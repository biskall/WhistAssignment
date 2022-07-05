import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Subject } from 'rxjs';
import { Router } from '@angular/router';
import { Product, StatsDate } from '../product.model';

@Injectable({ providedIn: 'root' })
export class AdminService {
  private products: Product[] = [];
  private productsUpdated = new Subject<Product[]>();
  private payUpdated = new Subject<void>();


  constructor(private http: HttpClient, private router: Router) {}

  getProductUpdatedListener() {
    return this.productsUpdated.asObservable();
  }

  getPayUpdatedListener() {
    return this.payUpdated.asObservable();
  }


  getProducts() {
    this.http
      .get<{ message: string; products: any }>(
        'http://localhost:3000/admin/products'
      )
      .pipe(
        map((Data) => {
          return Data.products.map((product: any) => {
            return {
              id: product._id,
              description: product.description,
              title: product.title,
              price: product.price,
              image: product.image,
              sold: product.sold,
              unique: product.unique,
            };
          });
        })
      )
      .subscribe((transformedProduct) => {
        this.products = transformedProduct;
        this.productsUpdated.next([...this.products]);
        console.log(this.products);
      });
  }

  addProduct(description: String, title: String, price: Number, image: String) {
    const product: Product = {
      id: undefined,
      description: description,
      title: title,
      price: price,
      image: image,
      sold: 0,
      unique: 0,
    };
    this.http
      .post<{ message: String; productId: String }>(
        'http://localhost:3000/admin/add',
        product
      )
      .subscribe(
        (responseData) => {
          product.id = responseData.productId;
          this.products.push(product);
          this.productsUpdated.next([...this.products]);
        },
        (error) => {
          console.log(error);
        }
      );
    console.log(product);
  }

  editProduct(
    id: String | undefined,
    description: String,
    title: String,
    price: Number,
    image: String,
    sold: Number,
    unique: Number
  ) {
    const product: Product = {
      id: id,
      description: description,
      title: title,
      price: price,
      image: image,
      sold: sold,
      unique: unique,
    };
    this.http
      .post('http://localhost:3000/admin/edit', product)
      .subscribe((updateProduct) => {
        console.log(updateProduct);
        const tempProducts = this.products.filter(
          (pro) => product.id !== pro.id
        );
        this.products = tempProducts;
        this.products.push(product);
        this.productsUpdated.next([...this.products]);
      });
  }

  deleteProduct(id: string) {
    this.http
      .delete('http://localhost:3000/admin/delete/' + id)
      .subscribe((product) => {
        console.log('delete post' + product);
        const tempProducts = this.products.filter((pro) => id !== pro.id);
        this.products = tempProducts;
        this.productsUpdated.next([...this.products]);
      });
  }

  pay(data: Product[]) {
    {
      data.forEach((item) => {
        const product: Product = {
          id: item.id,
          description: item.description,
          title: item.title,
          price: item.price,
          image: item.image,
          sold: item.sold,
          unique: item.unique,
        };
        this.http
          .post('http://localhost:3000/admin/edit', product)
          .subscribe((updateProduct) => {
            console.log('udated post' + updateProduct);
            this.payUpdated.next();
          });
      });
    }
  }

  totalPrice(totalPrice: number, dateString: string, dateNumber: number) {
    const statsDate: StatsDate = {
      totalPrice: totalPrice,
      dateString: dateString,
      dateNumber: dateNumber,
    };
    this.http
      .post<{ message: String }>(
        'http://localhost:3000/stats/addSales',
        statsDate
      )
      .subscribe((res) => {
      });
  }
}
