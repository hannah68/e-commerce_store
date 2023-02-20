import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-products-header',
  templateUrl: './products-header.component.html',
})
export class ProductsHeaderComponent {
  @Output() columnsCount = new EventEmitter<number>();
  sort = '';
  itemsShowCount = 12;


  onSortUpdated(newSort: string): void{
    this.sort = newSort;
  }

  onItemsUpdated(itemsCount:number): void{
    this.itemsShowCount = itemsCount;
  }

  onColumnsUpdated(colsNum:number): void{
    this.columnsCount.emit(colsNum);
  }
}
