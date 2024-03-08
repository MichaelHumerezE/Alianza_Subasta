import { Component } from '@angular/core';
import { MONTHS, SORTS, URL_BACKEND_IMAGES, YEARS } from '../../config/config';
import { Product } from '../../interfaces/product';
import { Category } from '../../interfaces/category';
import { Filter } from '../../interfaces/filter';
import { ProductService } from '../../services/product.service';
import { CategoryService } from '../../services/category.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FilterProductPipe } from '../../pipes/filter-product.pipe';
import {NgxPaginationModule} from 'ngx-pagination';
import {PaginationInstance} from 'ngx-pagination';
import { CountdownTimerComponent } from '../countdown-timer/countdown-timer.component';
import { interval } from 'rxjs';

@Component({
  selector: 'app-list-products',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule, FilterProductPipe, NgxPaginationModule, CountdownTimerComponent],
  templateUrl: './list-products.component.html',
  styleUrl: './list-products.component.css'
})
export class ListProductsComponent {

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

  page?: number;

  constructor(private productService: ProductService, public router: Router,
    private categoryService: CategoryService, private route: ActivatedRoute){}

  ngOnInit(){
    this.readParams();
    this.loadProducts();
    this.loadCategories();
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

  readParams(): void {
    this.route.params.subscribe((params) => {
      if(params['category']){
        this.filters.category = params['category'];
      }
      if(params['state']){
        this.filters.state = params['state'];
      }
    });
  }

}
