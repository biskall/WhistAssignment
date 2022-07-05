import { Component, OnInit } from '@angular/core';
import { StatsService } from './stats.service';
import { StatsDate } from '../product.model';
import { Subscription, timeout } from 'rxjs';
import { AdminService } from '../admin/admin.service';
import { Product } from '../product.model';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css'],
})
export class StatsComponent implements OnInit{
  constructor(
    public statsService: StatsService,
    public adminService: AdminService
  ) {}

  private productsSoldSub: Subscription | undefined;
  products: Product[] = [];
  productsSub : Subscription | undefined;
  ProductsSortBySold: Product[] = [];
  arrayOfDays: StatsDate[] = [];
  private arrayOfDaysSub: Subscription | undefined;
  productSortByU: Product[] = [];
  private productSortByUSub: Subscription | undefined;
  private paySub: Subscription | undefined;

  ngOnInit(){
    this.productsSub = this.adminService.getProductUpdatedListener().subscribe((product: Product[]): void =>{
      this.products = product;
      this.statsService.getsales();
      this.getTopDays()
      this.getSold()
      this.getUniqe()
    })

    this.paySub = this.adminService.getPayUpdatedListener().subscribe(() =>{
      this.getTopDays()
    })

  }

  getUniqe(){
    this.statsService.getProductsSortByUnique();
      this.productSortByUSub = this.statsService
        .getProductsSortByUniqueUpdatedListener()
        .subscribe((products: Product[]): void => {
          this.productSortByU = products;
      });
  }

  getSold(){
    this.statsService.getProductsSortBySold();
    this.productsSoldSub = this.statsService
      .getProductSortBySoldUpdatedListener()
      .subscribe((products: Product[]): void => {
        this.ProductsSortBySold = products;
      });
  }

  getTopDays(){
    this.arrayOfDaysSub = this.statsService
      .getstatsDateUpdatedListener()
      .subscribe((array: StatsDate[]): void => {
        this.arrayOfDays = array;
    });
  }
}
