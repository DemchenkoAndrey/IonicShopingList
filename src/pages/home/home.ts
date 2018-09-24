import {Component} from '@angular/core';
import {IonicPage, NavController} from 'ionic-angular';
import {ShoppingListService} from "../../services/shopping-list/shopping-list.service";
import {Observable} from 'rxjs/Observable';
import {map} from 'rxjs/operators';
import {Item} from "../../models/item.model";

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  shoppingList$: Observable<Item[]>;

  constructor(public navCtrl: NavController,
              private shopping: ShoppingListService) {
    // @ts-ignore
    this.shoppingList$ = this.shopping
      .getShoppingList() // RETURN DB LIST
      .snapshotChanges() //key and value
      .pipe(map(changes => {
        return changes.map(a => ({
          key: a.payload.key, ...a.payload.val()
        }));
      }));
  }
}

