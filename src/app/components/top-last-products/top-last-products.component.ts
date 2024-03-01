import { Component } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../interfaces/product';
import { RouterLink } from '@angular/router';
import { MONTHS, URL_BACKEND_IMAGES } from '../../config/config';
import { Filter } from '../../interfaces/filter';
import { FilterProductPipe } from '../../pipes/filter-product.pipe';
import { CommonModule } from '@angular/common';
import { CountdownTimerComponent } from '../countdown-timer/countdown-timer.component';

@Component({
  selector: 'app-top-last-products',
  standalone: true,
  imports: [RouterLink, FilterProductPipe, CommonModule, CountdownTimerComponent],
  templateUrl: './top-last-products.component.html',
  styleUrl: './top-last-products.component.css'
})

export class TopLastProductsComponent {

  products : Product[] = [];

  url_base = URL_BACKEND_IMAGES + 'article/';

  months = MONTHS;

  filters: Filter = {
    category: '',
    year: '',
    month: '',
    sort: '',
    state: '2',
    search: ''
  };

  month: number = 1;

  constructor(private productService: ProductService){}

  ngOnInit(){
    this.loadProducts();
    this.loadFilters();
  }

  loadProducts(){
    this.productService.getProducts().subscribe({
      next: (productsData) => {
        console.log("API get Products: " + productsData);
        this.products = productsData;
      },
      error: (errorData) => {
        console.error(errorData);
      }
    });
  }

  loadFilters(){
    const startDate = new Date();
    this.month = startDate.getMonth();
    this.filters.year = startDate.getFullYear().toString();
    this.filters.month = (startDate.getMonth() + 1).toString();
  }

}
