import { Component } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../interfaces/product';
import { Router, RouterLink } from '@angular/router';
import { MONTHS, SORTS, URL_BACKEND_IMAGES, YEARS } from '../../config/config';
import { SelectComponent } from '../select/select.component';
import { Category } from '../../interfaces/category';
import { CategoryService } from '../../services/category.service';
import { Filter } from '../../interfaces/filter';
import { CommonModule } from '@angular/common';
import { FilterProductPipe } from '../../pipes/filter-product.pipe';
import { FormsModule } from '@angular/forms';
import { CountdownTimerComponent } from '../countdown-timer/countdown-timer.component';
import { interval } from 'rxjs';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [RouterLink, SelectComponent, CommonModule, FilterProductPipe, FormsModule, CountdownTimerComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {

  products : Product[] = [];

  url_base = URL_BACKEND_IMAGES + 'article/';

  listCategories: Category[] = [];
  categories: string[] = [];
  years = YEARS;
  months = MONTHS;
  sorts = SORTS;
  search: String = '';

  filters: Filter = {
    category: '',
    year: '',
    month: '',
    sort: '',
    state: '2',
    search: ''
  };

  constructor(private productService: ProductService, public router: Router,
    private categoryService: CategoryService){}

  ngOnInit(){
    this.loadProducts();
    this.loadCategories();
    interval(5000).subscribe(() => {
      this.loadProducts();
    });
  }

  loadProducts(){
    this.productService.getProducts().subscribe({
      next: (productsData) => {
        this.products = productsData;
      },
      error: (errorData) => {
        console.error(errorData);
      }
    });
  }

  loadCategories(){
    this.categoryService.getCategories().subscribe({
      next: (categoriesData) => {
        categoriesData.map((category) => {
          this.categories.push(category.name.toLowerCase());
        });
      },
      error: (errorData) => {
        console.error("ERROR API get Categories: " + errorData);
      }
    });
  }
}
