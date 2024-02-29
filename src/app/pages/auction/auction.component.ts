import { Component } from '@angular/core';
import { ProductsComponent } from '../../components/products/products.component';
import { BreadcrumbsComponent } from '../../components/breadcrumbs/breadcrumbs.component';
import { ListProductsComponent } from '../../components/list-products/list-products.component';

declare var $: any;
declare function initPage([]): any;

@Component({
  selector: 'app-auction',
  standalone: true,
  imports: [ListProductsComponent, BreadcrumbsComponent],
  templateUrl: './auction.component.html',
  styleUrl: './auction.component.css'
})
export class AuctionComponent {
}
