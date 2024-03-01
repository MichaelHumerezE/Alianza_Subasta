import { Component } from '@angular/core';
import { BreadcrumbsComponent } from '../../components/breadcrumbs/breadcrumbs.component';
import { DetailProductComponent } from '../../components/detail-product/detail-product.component';

declare var $: any;
declare function initPage([]): any;

@Component({
  selector: 'app-detail-auction',
  standalone: true,
  imports: [DetailProductComponent, BreadcrumbsComponent],
  templateUrl: './detail-auction.component.html',
  styleUrl: './detail-auction.component.css'
})
export class DetailAuctionComponent {

  constructor() {
    setTimeout(() => {
      initPage($);
    }, 50);
  }
  
}
