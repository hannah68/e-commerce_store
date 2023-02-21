import { Component, EventEmitter, Output } from '@angular/core';
import { MatListOption } from '@angular/material/list';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html'
})
export class FiltersComponent {
  @Output() showCategory = new EventEmitter<string>();
  categories = ['shoes', 'jeans'];

  onShowCategory(category: MatListOption[]): void{
    category.map(cta => {
      this.showCategory.emit(cta.value);
    })
  }
}
