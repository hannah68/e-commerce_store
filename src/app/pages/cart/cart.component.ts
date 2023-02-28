import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { loadStripe } from '@stripe/stripe-js';
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

  constructor(private cartService: CartService, private httpClient: HttpClient){}

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

  onCheckout(): void{
    this.httpClient.post('http://localhost:4242/checkout', {
      items: this.cart.items
    }).subscribe(async(res:any) => {
      let stripe = await loadStripe('pk_test_51MgQ1OHzy2wESnBK99aTk344hQyEBwm9yziEHI4DMlJB1GQATRgaxHPXTDj5D40eP0r4AEHVMvE0cdNgsXgsUiRg00NTwggDik');
      stripe?.redirectToCheckout({sessionId: res.id})
    })
  }
}
