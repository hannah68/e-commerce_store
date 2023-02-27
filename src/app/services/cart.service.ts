import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject } from 'rxjs';
import { Cart, CartItem } from '../model/cart.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cart = new BehaviorSubject<Cart>({items: []});

  constructor(private _snackBar:MatSnackBar) { }

  addToCart(item: CartItem): void{
    const items = [...this.cart.value.items];
    const isItemInCart = items.find(_item => _item.id === item.id);

    if(isItemInCart){
      isItemInCart.quantity += 1;
    }else{
      items.push(item);
    }

    this.cart.next({items});
    this._snackBar.open('1 item added to cart', 'OK', {duration: 3000});
  }

  getTotal(items: CartItem[]): number{
    return items.map(item => item.price).reduce((prev, curr) => prev+ curr, 0);
  }

  clearCart(){
    this.cart.next({items: []});
    this._snackBar.open('Cart is cleared!', 'OK', {duration: 3000});
  }

  removeItemFromCart(item: CartItem, notify=true): CartItem[]{
    const filteredItems = this.cart.value.items.filter(el => el.id !== item.id);

    if(notify){
      this.cart.next({items: filteredItems});
      this._snackBar.open('1 item removed from cart.', 'OK', {duration: 3000});
    }

    return filteredItems
  }

  subtractQuantity(item: CartItem): void{
    let itemRemovedFromCart: CartItem | undefined;

    let updatedItem = this.cart.value.items.map(el => {
      if(el.id === item.id){
        el.quantity--;
        if(el.quantity === 0){
          itemRemovedFromCart = item;
        }
      }
      return el;
    });

    if(itemRemovedFromCart){
      updatedItem = this.removeItemFromCart(itemRemovedFromCart, false);
    }

    this.cart.next({items: updatedItem});
    this._snackBar.open('1 item removed from cart.', 'OK', {duration: 3000});

  }
}
