import { Component } from '@angular/core';
import { ProductsProposerComponent } from '../../components/products-proposer/products-proposer.component';
import { BreadcrumbsComponent } from '../../components/breadcrumbs/breadcrumbs.component';

declare var $: any;
declare function initPage([]): any;

@Component({
  selector: 'app-participated-auctions',
  standalone: true,
  imports: [ProductsProposerComponent, BreadcrumbsComponent],
  templateUrl: './participated-auctions.component.html',
  styleUrl: './participated-auctions.component.css'
})
export class ParticipatedAuctionsComponent {
}
