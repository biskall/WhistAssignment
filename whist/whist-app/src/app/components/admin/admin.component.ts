import { Component, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import {AdminService} from './admin.service'
import {Product} from '../product.model';
import { Subscription } from 'rxjs';
import {StatsService} from '../stats/stats.service'


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit, OnChanges{

  products: Product[]= [];
  private productsSub : Subscription | undefined;
  private statsSub : Subscription | undefined;

  constructor(public adminService : AdminService, public statsService: StatsService) { }

  ngOnChanges(): void {
    this.productsSub = this.adminService.getProductUpdatedListener().subscribe((products: Product[]): void =>{
      this.products = products;
    });
  }

  ngOnInit(): void {
    this.adminService.getProducts();
    this.productsSub = this.adminService.getProductUpdatedListener().subscribe((products: Product[]): void =>{
      this.products = products;
    })
  }



  displayedColumns2: string[] = ['title','description','price','image', 'options'];


  @ViewChild(MatTable) table!: MatTable<Product>;

  removeData(id: any) {
    console.log(id);
    this.adminService.deleteProduct(id);
    this.table.renderRows();
  }
}

