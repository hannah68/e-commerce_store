import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from 'src/app/model/product.model';

@Component({
  selector: 'app-product-box',
  templateUrl:'./product-box.component.html'
})
export class ProductBoxComponent {
  @Input() fullWidthMode = false;
  @Output() addToCart = new EventEmitter<Product>();
  @Input() product:Product | undefined;
 

  onAddToCart(){
    this.addToCart.emit(this.product);
  }
}
