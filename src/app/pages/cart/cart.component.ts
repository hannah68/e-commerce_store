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
  cart: Cart = { items: [
    {
      product: 'https://via.placeholder.com/150',
      name: 'snickers',
      price: 200,
      quantity: 1,
      id: 1
    },
    {
      product: 'https://via.placeholder.com/150',
      name: 'bag',
      price: 17,
      quantity: 1,
      id: 2
    },
    {
      product: 'https://via.placeholder.com/150',
      name: 'jewlry',
      price: 55,
      quantity: 2,
      id: 3
    },
  ]};

  constructor(private cartService: CartService){}

  ngOnInit(): void {
    this.dataSource = this.cart.items;
  }

  getTotal(items: CartItem[]): number{
    return this.cartService.getTotal(items);
  }
  
}
