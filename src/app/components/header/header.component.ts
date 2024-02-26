import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AUCTION_STATE } from '../../config/config';
import { Category } from '../../interfaces/category';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  auction_states = AUCTION_STATE;

  categories: Category[] = [];

  constructor(private categoryService: CategoryService) { }

  ngOnInit() {
    this.loadCategories();
  }

  loadCategories() {
    this.categoryService.getCategories().subscribe({
      next: (categoriesData) => {
        console.log("API get Categories: " + categoriesData);
        this.categories = categoriesData;
      },
      error: (errorData) => {
        console.error("ERROR API get Categories: " + errorData);
      }
    });
  }

}
