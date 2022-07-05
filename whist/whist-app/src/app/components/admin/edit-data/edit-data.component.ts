import { Component, Inject, Input, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {AdminService} from '../admin.service'
import { NgForm } from '@angular/forms';
import {Product} from '../../product.model';



@Component({
  selector: 'app-edit-data',
  templateUrl: './edit-data.component.html',
  styleUrls: ['./edit-data.component.css']
})
export class EditDataComponent implements OnInit {

  ngOnInit(): void {
  }

  @Input() element!: Product;

  constructor(public dialog: MatDialog) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(EditDialogOverviewExampleDialog, {
      height: '450px',
      width: '800px',
      data: this.element,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: './edit-dialog-overview-example-dialog.html',
})
export class EditDialogOverviewExampleDialog {
  constructor(public adminService: AdminService,
    public dialogRef: MatDialogRef<EditDialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: Product,
  ) {}


  onEditProduct(form : NgForm){
    if(form.invalid){
      return;
    }
   console.log(form.value.description + form.value.title + form.value.price + form.value.image + " check");
   this.adminService.editProduct(this.data.id,form.value.description,
   form.value.title, form.value.price, form.value.image,this.data.sold, this.data.unique);

  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}


