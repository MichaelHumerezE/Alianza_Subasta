import { Component } from '@angular/core';
import { BreadcrumbsComponent } from '../../components/breadcrumbs/breadcrumbs.component';
import { DetailProductComponent } from '../../components/detail-product/detail-product.component';

@Component({
  selector: 'app-detail-auction',
  standalone: true,
  imports: [DetailProductComponent, BreadcrumbsComponent],
  templateUrl: './detail-auction.component.html',
  styleUrl: './detail-auction.component.css'
})
export class DetailAuctionComponent {

}
