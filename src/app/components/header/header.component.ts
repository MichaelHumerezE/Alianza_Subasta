import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AUCTION_STATE, URL_BACKEND_IMAGES } from '../../config/config';
import { Category } from '../../interfaces/category';
import { CategoryService } from '../../services/category.service';
import { Proposer } from '../../interfaces/proposer';
import { AuthService } from '../../services/auth.service';
import { Filter } from '../../interfaces/filter';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { Product } from '../../interfaces/product';
import { CommonModule } from '@angular/common';
import { FilterProductPipe } from '../../pipes/filter-product.pipe';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, FormsModule, CommonModule, FilterProductPipe],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  auction_states = AUCTION_STATE;

  products: Product[] = [];
  productsProposer: Product[] = [];
  categories: Category[] = [];

  proposer: Proposer | null = null;

  filters: Filter = {
    category: '',
    year: '',
    month: '',
    sort: '',
    state: '',
    search: ''
  };

  url_base = URL_BACKEND_IMAGES + 'article/';

  constructor(private categoryService: CategoryService, private authService: AuthService,
    private productService: ProductService) { }

  ngOnInit() {
    this.proposer = this.authService.proposer;
    this.loadProducts();
    this.loadCategories();
    console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa', this.productsProposer);
  }

  loadCategories() {
    this.categoryService.getCategories().subscribe({
      next: (categoriesData) => {
        console.log('Respuesta de la API - getCategories: ', categoriesData);
        this.categories = categoriesData;
      },
      error: (errorData) => {
        console.error("ERROR API get Categories: " + errorData);
      }
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

  loadProductsProposer(){
    const formData = this.loadFormData();
    this.productService.getProductsByIdProposer(formData).subscribe({
      next: (productsData) => {
        this.productsProposer = productsData;
      },
      error: (errorData) => {
        console.error(errorData);
      }
    });
  }

  logout(){
    this.authService.logout();
    this.proposer = null;
  }

  loadFormData(){
    const formData = new FormData();
    formData.append('proposer_id', this.proposer?.id??'');
    return formData;
  }
}
