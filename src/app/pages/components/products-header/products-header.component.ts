import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-products-header',
  templateUrl: './products-header.component.html',
})
export class ProductsHeaderComponent {
  @Output() columnsCount = new EventEmitter<number>();
  @Output() itemsShowCountChange = new EventEmitter<number>();
  @Output() sortItemsChange = new EventEmitter<string>();

  sort = 'desc';
  itemsShowCount = 12;


  onSortUpdated(newSort: string): void{
    this.sort = newSort;
    this.sortItemsChange.emit(newSort);
  }

  onNumberOfItemsShowUpdated(itemsCount:number): void{
    this.itemsShowCount = itemsCount;
    this.itemsShowCountChange.emit(itemsCount);
  }

  onColumnsUpdated(colsNum:number): void{
    this.columnsCount.emit(colsNum);
  }
}
