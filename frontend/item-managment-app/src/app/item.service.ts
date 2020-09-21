import { Injectable } from '@angular/core';
import {HttpClient, HttpParams, HttpHeaders, HttpResponse} from '@angular/common/http'
import { mergeMap, map} from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  root = "http://localhost:3000/"
  constructor(private http: HttpClient) { }
  
  /**
  * All the helper functions which return the api's anwser
  */
  get_items(){
    return this.http.get(this.root + "items/getItems");
  }

  get_item(_id){
    return this.http.get(this.root + "items/getItemById/" + _id)
  }

  deposit_quantity(_id,_amount){
     let body = {
       id:_id,
       amount:_amount
     }
     return this.http.put(this.root+"items/depositItem?",body);
  }

  withdraw_quantity(_id,_amount){
    let body = {
      id:_id,
      amount:_amount
    }
    return this.http.put(this.root+"items/withdrawItem?",body);
 }

  delete_item(_id){
    return this.http.delete(this.root+"items/deleteItem/" + _id);
  }

 update_item(_id,_name,_amount,_description){
  let body = {
    id:_id,
    name:_name,
    amount:_amount,
    description:_description
  }
  return this.http.post(this.root+"items/updateItem?",body);
 }

 add_item(_name,_amount,_description){
  let body = {
    name:_name,
    amount:_amount,
    description:_description
  }
  return this.http.post(this.root+"items/addItem?",body);
 }
}
