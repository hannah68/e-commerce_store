import { Component } from '@angular/core';
import { Product } from 'src/app/model/product.model';
import { CartService } from 'src/app/services/cart.service';
// 1 item per row(1 column) has height of 400, 3 item per row has height of 335
const ROWS_HEIGHT: {[id:number]: number} = {1: 400, 3: 335, 4: 350}

@Component({
  selector: 'app-home',
  templateUrl:'./home.component.html'
})
export class HomeComponent {
  category: string | undefined;
  cols = 3;
  rowHeight = ROWS_HEIGHT[this.cols];

  constructor(private cartService: CartService){}

  onColumnsCountChange(colsNum: number): void{
    this.cols = colsNum;
    this.rowHeight = ROWS_HEIGHT[this.cols];
  }

  onCategoryName(category: string):void{
    this.category = category;
  }

  OnAddItemToCart(product: Product): void{
    this.cartService.addToCart({
      product: product.image,
      name: product.title,
      price: product.price,
      quantity: 1,
      id: product.id,
    });
  }
}
