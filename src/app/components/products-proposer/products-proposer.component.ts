import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Product } from '../../interfaces/product';
import { ProductService } from '../../services/product.service';
import { URL_BACKEND_IMAGES } from '../../config/config';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-products-proposer',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './products-proposer.component.html',
  styleUrl: './products-proposer.component.css'
})
export class ProductsProposerComponent {

  products: Product[] = [];

  url_base = URL_BACKEND_IMAGES + 'article/';

  constructor(private authService: AuthService, private productService: ProductService){}

  ngOnInit(){
    this.loadProducts();
  }

  loadProducts(){
    const formData = this.loadFormData();
    this.productService.getProductsByIdProposer(formData).subscribe({
      next: (productsData) => {
        this.products = productsData;
      }
    });
  }

  loadFormData(): FormData{
    const formData = new FormData();
    formData.append('proposer_id', this.authService.proposer?.id.toString()!);
    return formData;
  }

}
