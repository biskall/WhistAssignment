import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Product } from '../../product.model';
import {AdminService} from '../../admin/admin.service'
import { DatePipe } from '@angular/common';
import { StatsService } from '../../stats/stats.service';

export interface Data{
  flagOfCart : boolean,
  products : Product[]
}

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit{

  @Input() element!: Product[];

  ngOnInit(): void {
  }


  constructor(public dialog: MatDialog,
    public statsService: StatsService,
    public adminService: AdminService) {}


  @Output() cleanCart = new EventEmitter<{ flag: boolean }>();
  flagOfCart : boolean = false;

  openDialog(): void {

    const dialogRef = this.dialog.open(CartDialogOverviewExampleDialog, {
      width: '300px',
      height: '300px',
      data: {flagOfCart: this.flagOfCart ,products: this.element },
    });


    dialogRef.afterClosed().subscribe(result => {
      this.flagOfCart = result;
      this.cleanCart.emit({ flag: this.flagOfCart });
      // window.location.reload();
    });
  }
}

@Component({
  selector: 'cart-dialog-overview-example-dialog',
  templateUrl: 'cart-dialog-overview-example-dialog.html',
  styleUrls: ['./cart.component.css']
})
export class CartDialogOverviewExampleDialog  {
  total !: number;
  date !: string;
  constructor(
    public statsService: StatsService,
    public adminService: AdminService,
    public dialogRef: MatDialogRef<CartDialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: Data,
  ) {
    console.log(data)
    this.total = 0;
    data.products.forEach(item => this.total += parseInt(item.price.toString()))
  }


  today: Date = new Date();
  pipe = new DatePipe('en-US');
  todayWithPipe !: string | null;


  payOnProduct(){
  this.data.flagOfCart = true;
  this.dateOfPay();
  this.adminService.pay(this.data.products);
  }

  dateOfPay(){
    this.todayWithPipe = this.pipe.transform(Date.now(), 'dd/MM/yyyy');
    console.log(this.todayWithPipe);
    if(this.todayWithPipe!= null)
    this.adminService.totalPrice(this.total,this.todayWithPipe, Date.now())
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}


