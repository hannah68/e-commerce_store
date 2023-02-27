import { Component, OnInit } from '@angular/core';
import { Cart, CartItem } from 'src/app/model/cart.model';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html'
})
export class CartComponent implements OnInit{
  dataSource: Array<CartItem> = [];
  columnsName: Array<string> = ['product', 'name', 'price', 'quantity', 'total', 'action'];
  cart: Cart = { items: []};

  constructor(private cartService: CartService){}

  ngOnInit(): void {
    this.cartService.cart.subscribe(cartItmes => {
      this.cart = cartItmes;
      this.dataSource = this.cart.items;
    })
  }

  getTotal(items: CartItem[]): number{
    return this.cartService.getTotal(items);
  }

  onClearCart():void{
    this.cartService.clearCart()
  }

  onRemoveItemFromCart(item:CartItem): void{
    this.cartService.removeItemFromCart(item);
  }
  
  onAddQuantity(item: CartItem): void{
    this.cartService.addToCart(item);
  }

  onRemoveQuantity(item: CartItem): void{
    this.cartService.subtractQuantity(item);
  }
}
