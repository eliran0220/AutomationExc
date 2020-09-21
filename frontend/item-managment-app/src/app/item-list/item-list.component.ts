import { Component, OnInit } from '@angular/core';
import {ItemService} from '../item.service'
import { HttpParams } from '@angular/common/http';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { NgForm, NgModel } from '@angular/forms';
import {Item} from '../Models/Item';
import { updatePartiallyEmittedExpression } from 'typescript';
import { NgbDateISOParserFormatter } from '@ng-bootstrap/ng-bootstrap/datepicker/ngb-date-parser-formatter';
@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit {
  item_list : Array<Item> = [];
  alertMessage: String ="Here you will see the results of the operations.";
  serverDown:String ="The server is currently down, please check again later!";
  constructor(private itemService:ItemService, private modal: NgbModal ) { }

  ngOnInit(): void {
   this.itemService.get_items().subscribe((data:any)=>{
     if (data.error == true){
       alert('Error!');
     } else {
       for (var index in data){
         var temp = data[index];
         var item = new Item(temp.id,temp.name,temp.amount,temp.description);
         this.item_list.push(item);
       }
     }
   })
  }
  
  /**
  * the open function is used to open whatever operation the user has chosen to.
  */
  open(content) {
    this.modal.open(content, {ariaLabelledBy: 'modal-basic-content'}).result.then((result) => {
      ;
    }, (reason) => {
    });
  }
  
  /**
  * This activating the get_item function which returns an item by id.
  */
  onGetSubmit(form:NgForm):any {
    var id = form.value.Id;
    this.itemService.get_item(id).subscribe((data:any) =>{
      if(data.error == true){
        this.alertMessage = data.reason;
      } else {
        var item = data;
        this.alertMessage = "Item Id: "+id +" \n" + "Name: " + item.name +
        "\n" + "Amount: " + item.amount +
        "\n" + "Description: " + item.description; 
      }
    },
    err => {
      console.log(err.message);
      this.alertMessage = this.serverDown;
    },
    )
    form.reset();
}

  
  /**
  * This activates the deposit_quantity function which deposits an amount to a given id.
  */
  onDepositSubmit(form:NgForm, item_id) :any {
    this.modal.dismissAll();
    var amount = form.value.Amount;
    this.itemService.deposit_quantity(item_id,amount).subscribe((data:any) => {
      if (data.error == true){
        this.alertMessage = data.reason;
      }else{
        this.alertMessage = "Deposit success!" +"\n" +"Current amount is: " +data;
        this.updateAmount(item_id,data);
      }
    },
    err => {
      console.log(err.message);
      this.alertMessage = this.serverDown;
    },
    );
  
  }
  
  /**
  * This activates the withdraw_quantity function which withdraws an amount to the chosen item.
  */
  onWithdrawSubmit(form:NgForm, item_id) :any {
    this.modal.dismissAll();
    var amount = form.value.Amount;
    this.itemService.withdraw_quantity(item_id,amount).subscribe((data:any) => {
      if (data.error == true){
        this.alertMessage = data.reason;
      }else{
        this.alertMessage = "Withdraw success!" +"\n" +"Current amount is: " +data;
        this.updateAmount(item_id,data);
      }
    },
    err => {
      console.log(err.message);
      this.alertMessage = this.serverDown;
    },
    );
  }

  /**
  * This activates the delete_item function which deletes the chosen item.
  */
  onDeleteSubmit(template:NgbModal,item_id) :any {
    this.modal.dismissAll();
    this.itemService.delete_item(item_id).subscribe((data:any) => {
      if (data.error == true){
        this.alertMessage = data.reason;
      }else{
        this.alertMessage = "Delete success!";
        this.deleteItem(item_id);
      }
    },
    err => {
      console.log(err.message);
      this.alertMessage = this.serverDown;
    },
    );
  }

  /**
  * This activates the add_item function which adds the given item to the database.
  */
  onAddSubmit(form:NgForm):any{
    this.modal.dismissAll();
    this.itemService.add_item(form.value.Name,form.value.Amount,form.value.Description).subscribe((data:any)=>{
      if(data.error == true){
        this.alertMessage = data.reason;
      } else {
        this.alertMessage = "Add success!";
        var id = data;
        this.addItem(id,form.value.Name,form.value.Amount,form.value.Description);
        form.reset();
        this.alertMessage = "Item has been added!";
      }
    },
    err => {
      console.log(err.message);
      this.alertMessage = this.serverDown;
    },
    )      
  }

  /**
  * This activates the update_item function which updates the chosen item via the given fields..
  */
  onUpdateSubmit(form:NgForm,item_id) :any{
    this.modal.dismissAll();
    var name = form.value.Name;
    var amount = form.value.Amount;
    var description = form.value.Description;
    this.itemService.update_item(item_id,name,amount,description).subscribe((data:any) =>{
      if (data.error == true){
        this.alertMessage = data.reason;
      }else{
        this.alertMessage = "Update success!";
        this.updateItem(item_id,data.name,data.amount,data.description);
      }
    },
    err => {
      console.log(err.message);
      this.alertMessage = this.serverDown;
    },
    );
  }

  /**
  * This section is helper functions which changes the state of the item given the operation.
  */
  updateItem(id,name,amount,description){
    for (var i = 0; i<this.item_list.length; i++){
      if (this.item_list[i].id === id){
        this.item_list[i].name = name;
        this.item_list[i].amount = amount;
        this.item_list[i].description = description;
        return;
      }
    }
  }

  updateAmount(item_id,amount){
    for (var i = 0; i<this.item_list.length; i++){
      if (this.item_list[i].id === item_id){
        this.item_list[i].amount = amount;
        return;
      }
    }
  }

  deleteItem(item_id){
    for (var i = 0; i<this.item_list.length; i++){
      if (this.item_list[i].id === item_id){
        this.item_list.splice(i,1);
        return;
      }
    }
  }

  addItem(id,name,amount,description){
    var item = new Item(id,name,amount,description);
    this.item_list.push(item);
  }
}

