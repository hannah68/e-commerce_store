import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/model/product.model';
import { CartService } from 'src/app/services/cart.service';
import { StoreService } from 'src/app/services/store.service';
// 1 item per row(1 column) has height of 400, 3 item per row has height of 335
const ROWS_HEIGHT: {[id:number]: number} = {1: 400, 3: 335, 4: 350}

@Component({
  selector: 'app-home',
  templateUrl:'./home.component.html'
})
export class HomeComponent implements OnInit, OnDestroy{
  category: string | undefined;
  cols = 3;
  rowHeight = ROWS_HEIGHT[this.cols];
  products: Product[] | undefined;
  sort = 'Desc';
  limit = '12';
  productsSubscription: Subscription | undefined;

  constructor(private cartService: CartService, private storeService: StoreService){}

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(): void{
    this.productsSubscription = this.storeService.getAllProducts(this.limit, this.sort).subscribe(_products => {
      this.products = _products;
    });
  }

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

  onItemsShowCountChange(count: number): void{
    this.limit = count.toString();
    this.getProducts();
  }

  onSortItemsChange(newSort: string): void{
    this.sort = newSort;
    this.getProducts();
  }

  ngOnDestroy(): void {
    this.productsSubscription?.unsubscribe();
  }
}
