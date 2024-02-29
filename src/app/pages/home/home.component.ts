import { Component } from '@angular/core';
import { HeroAreaComponent } from '../../components/hero-area/hero-area.component';
import { FeaturesAreaComponent } from '../../components/features-area/features-area.component';
import { TopLastProductsComponent } from '../../components/top-last-products/top-last-products.component';
import { BannerComponent } from '../../components/banner/banner.component';
import { ProductsComponent } from '../../components/products/products.component';

declare var $: any;
declare function initPage([]): any;

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeroAreaComponent,
    FeaturesAreaComponent,
    TopLastProductsComponent,
    BannerComponent,
    ProductsComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
}
