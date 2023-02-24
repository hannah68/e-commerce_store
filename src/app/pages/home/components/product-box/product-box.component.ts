import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from 'src/app/model/product.model';

@Component({
  selector: 'app-product-box',
  templateUrl:'./product-box.component.html'
})
export class ProductBoxComponent {
  @Input() fullWidthMode = false;
  @Output() addToCart = new EventEmitter<Product>();
  product:Product | undefined = {
    id: 1,
    title: 'sneakers',
    price:320,
    category:'shoes',
    description:'very chich',
    image:'http://cia.placeholder.com/150',
  };

  onAddToCart(){
    this.addToCart.emit(this.product);
  }
}
