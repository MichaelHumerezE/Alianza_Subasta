import { Component } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../interfaces/product';
import { RouterLink } from '@angular/router';
import { URL_BACKEND_IMAGES } from '../../config/config';

@Component({
  selector: 'app-top-last-products',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './top-last-products.component.html',
  styleUrl: './top-last-products.component.css'
})

export class TopLastProductsComponent {

  products : Product[] = [];

  url_base = URL_BACKEND_IMAGES + 'article/';

  constructor(private productService: ProductService){}

  ngOnInit(){
    this.loadProducts();
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

}
