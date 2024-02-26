import { Component } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../interfaces/product';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {

  products : Product[] = [];

  constructor(private productService: ProductService, public router: Router){}

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
