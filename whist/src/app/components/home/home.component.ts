import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs';
import {AdminService} from '../admin/admin.service'
import {StatsService} from '../stats/stats.service'
import {Product} from '../product.model'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  private productsSub : Subscription | undefined;
  private paySub : Subscription | undefined;
  products: Product[]=[];
  cart : Product[]=[];
  tempUnique !: number;
  tempProduct !: Product;

  constructor(public adminService : AdminService
    ,public statsService : StatsService) { }


  ngOnInit(): void {
    this.adminService.getProducts();
    this.productsSub = this.adminService.getProductUpdatedListener().subscribe((products: Product[]): void =>{
    this.products = products;
    })
     this.paySub = this.adminService.getPayUpdatedListener().subscribe(() =>{
      this.cart = [];
    })
  }

  addToCart(product: Product){
    if(!this.cart.includes(product)){
      this.tempUnique = parseInt(product.unique.toString()) + 1;
      product.unique = this.tempUnique;
      product.sold = parseInt(product.sold.toString()) + 1;
      this.cart.push(product);
      console.log(this.cart);
    }
    else{
    this.cart.forEach(x=>{
      if(x.id == product.id){
        product.unique = x.unique;
      }
    })
    product.sold = parseInt(product.sold.toString()) + 1;
    this.cart.push(product);
    }
  }

  flag = false;

  checkCart(eventData : boolean ) {
    this.flag =  eventData;
    if(this.flag == true){
      this.cart = [];
    }
  }


}

