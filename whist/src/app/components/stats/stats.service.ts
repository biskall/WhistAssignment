import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Subject } from 'rxjs';
import { Router } from '@angular/router';
import { Product, StatsDate } from '../product.model';
import { DatePipe } from '@angular/common';

export interface TopDays {
  total: Number;
  day: String;
}

@Injectable({ providedIn: 'root' })
export class StatsService {
  private products: Product[] = [];
  private ProductsSortByUnique: Product[] = [];
  private ProductsSortBySold: Product[] = [];
  private productsUpdated = new Subject<Product[]>();
  private statsDate: StatsDate[] = [];
  private statsDateUpdated = new Subject<StatsDate[]>();
  pipe = new DatePipe('en-US');
  salesInDays: TopDays[] = [];
  private ProductSortBySoldUpdated = new Subject<Product[]>();
  private ProductsSortByUniqueUpdated = new Subject<Product[]>();
  private refreshNeeded = new Subject<void>();

  constructor(private http: HttpClient, private router: Router) {}

  getRefreshNeeded(){
    return this.refreshNeeded;
  }

  getstatsDateUpdatedListener() {
    return this.statsDateUpdated.asObservable();
  }

  getsales() {
    const dateNow = new Date().getDate();
    const dateBefor = new Date().setDate(dateNow - 5);

    this.http
      .get<{ message: string; sales: any }>(
        'http://localhost:3000/stats/getStats'
      )
      .pipe(
        map((Data) => {
          return Data.sales.map((sale: any) => {
            return {
              totalPrice: sale.totalPrice,
              dateString: sale.dateString,
              dateNumber: sale.dateNumber,
            };
          });
        })
      )
      .subscribe((transformedProduct) => {
        const sales = transformedProduct
          .filter((x: { dateNumber: number }) => x.dateNumber >= dateBefor)
          .sort(
            (a: { totalPrice: number }, b: { totalPrice: number }) =>
              b.totalPrice - a.totalPrice
          );
        this.statsDate = sales;
        this.statsDateUpdated.next([...this.statsDate]);
      });
  }

  getProductSortBySoldUpdatedListener() {
    return this.ProductSortBySoldUpdated.asObservable();
  }

  getProductsSortBySold() {
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
        this.ProductsSortBySold = transformedProduct.sort(
          (a: { sold: number }, b: { sold: number }) => b.sold - a.sold
        );
        if (this.ProductsSortBySold.length > 5)
          this.ProductSortBySoldUpdated.next([
            this.ProductsSortBySold[0],
            this.ProductsSortBySold[1],
            this.ProductsSortBySold[2],
            this.ProductsSortBySold[3],
            this.ProductsSortBySold[4],
          ]);
        else this.ProductSortBySoldUpdated.next([...this.ProductsSortBySold]);
      });
  }

  getProductsSortByUniqueUpdatedListener() {
    return this.ProductsSortByUniqueUpdated.asObservable();
  }

  getProductsSortByUnique() {
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
        this.ProductsSortByUnique = transformedProduct.sort(
          (a: { unique: number }, b: { unique: number }) => b.unique - a.unique
        );
        if (this.ProductsSortByUnique.length > 5)
          this.ProductsSortByUniqueUpdated.next([
            this.ProductsSortByUnique[0],
            this.ProductsSortByUnique[1],
            this.ProductsSortByUnique[2],
            this.ProductsSortByUnique[3],
            this.ProductsSortByUnique[4],
          ]);
        else this.ProductsSortByUniqueUpdated.next([...this.ProductsSortByUnique]);
      });
  }
}
