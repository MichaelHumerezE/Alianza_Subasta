import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AUCTION_STATE } from '../../config/config';
import { Category } from '../../interfaces/category';
import { CategoryService } from '../../services/category.service';
import { Proposer } from '../../interfaces/proposer';
import { AuthService } from '../../services/auth.service';

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

  proposer: Proposer | null = null;

  constructor(private categoryService: CategoryService, private authService: AuthService) { }

  ngOnInit() {
    this.proposer = this.authService.proposer;
    this.loadCategories();
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

  logout(){
    this.authService.logout();
    this.proposer = null;
  }

}
