import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Item} from "../../models/item.model";
import {ShoppingListService} from "../../services/shopping-list/shopping-list.service";
import {ToastService} from "../../services/toast/toast.service";

@IonicPage()
@Component({
  selector: 'page-add-shopping-item',
  templateUrl: 'add-shopping-item.html',
})
export class AddShoppingItemPage {
  item: Item = {
    name: '',
    quantity: undefined,
    price: undefined
  };
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private shopping: ShoppingListService,
              private  toast: ToastService) {
  }
  addItem(item: Item) {
    this.shopping.addItem(item).then( ref => {
      this.toast.show(`${item.name} added!`);
      this.navCtrl.setRoot('HomePage', {key: ref.key});
    })
  }
}
