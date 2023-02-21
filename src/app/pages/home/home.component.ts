import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl:'./home.component.html'
})
export class HomeComponent {
  category: string | undefined;
  cols = 3

  onColumnsCountChange(colsNum: number): void{
    this.cols = colsNum;
  }

  onCategoryName(category: string):void{
    this.category = category;
  }
}
