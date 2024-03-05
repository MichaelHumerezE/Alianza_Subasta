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

  
  @Input() product?: Product;;
  
  files: string[] = [];

  slides: any[] = [];
  url_base = URL_BACKEND_IMAGES + 'article/';

  constructor() { }

  ngOnInit(): void {
    this.loadFiles();
      this.slides = this.files.map((file, index) => ({
        id: index,
        src: this.url_base + file,
        title: '',
        subtitle: '',
      }));
  }

  ngOnChanges(){
    if(this.product){
      this.loadFiles();
    }
  }

  loadFiles()
  {
    this.files = this.product?.images??[];
  }
}
