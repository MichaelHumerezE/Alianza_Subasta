import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CarouselModule } from '@coreui/angular';
import { URL_BACKEND_IMAGES } from '../../config/config';
import { Product } from '../../interfaces/product';

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [CarouselModule, CommonModule, RouterLink],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.css',
})
export class CarouselComponent {

  @Input() product?: Product;

  slides: any[] = [];

  url_base = URL_BACKEND_IMAGES + 'article/';

  constructor() { }

  ngOnInit() {
    this.loadSlides();
  }

  /*ngOnChanges() {
    if (this.product) {
      this.loadSlides();
    }
  }*/

  loadSlides() {
    this.slides = this.product?.images.map((image, index) => ({
      id: index,
      src: this.url_base + image,
      title: '',
      subtitle: '',
    })) || [];
    console.log(this.slides);
  }
}
