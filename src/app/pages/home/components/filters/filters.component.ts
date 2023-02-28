import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { MatListOption } from '@angular/material/list';
import { Subscribable, Subscription } from 'rxjs';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html'
})
export class FiltersComponent implements OnInit, OnDestroy{
  @Output() showCategory = new EventEmitter<string>();
  categories:string[] = [];
  categoriesSubscription: Subscription | undefined;

  constructor(private storeService: StoreService){}

  ngOnInit(): void {
     this.categoriesSubscription = this.storeService.getAllCategories().subscribe(cat => {
      this.categories = cat;
    })
  }

  onShowCategory(category:string): void{
    console.log('cat', category)
    this.showCategory.emit(category);
  }

  ngOnDestroy(): void {
    this.categoriesSubscription?.unsubscribe()
  }
}
