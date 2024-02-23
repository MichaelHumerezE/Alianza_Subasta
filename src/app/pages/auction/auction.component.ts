import { Component } from '@angular/core';
import { ProductsComponent } from '../../components/products/products.component';
import { BreadcrumbsComponent } from '../../components/breadcrumbs/breadcrumbs.component';

@Component({
  selector: 'app-auction',
  standalone: true,
  imports: [ProductsComponent, BreadcrumbsComponent],
  templateUrl: './auction.component.html',
  styleUrl: './auction.component.css'
})
export class AuctionComponent {

}
