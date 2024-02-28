import { Component, Input } from '@angular/core';
import { OfferService } from '../../services/offer.service';
import { Offer } from '../../interfaces/offer';
import { TableModule } from '@coreui/angular';
import { Product } from '../../interfaces/product';

@Component({
  selector: 'app-offers',
  standalone: true,
  imports: [TableModule],
  templateUrl: './offers.component.html',
  styleUrl: './offers.component.css'
})
export class OffersComponent {
  @Input() product?: Product;

  offers: Offer[] = [];

  constructor(private offerService: OfferService){}

  ngOnInit(){
    this.loadOffers();
  }

  ngOnChanges() {
    if (this.product) {
      this.loadOffers();
    }
  }

  loadOffers(){
    const formData = this.loadFormData();
    this.offerService.getOffersByProduct(formData).subscribe({
      next: (offersData) => {
        this.offers = offersData;
      }
    });
  }

  loadFormData(): FormData{
    const formData = new FormData();
    formData.append('id', this.product?.id.toString()!);
    return formData;
  }
}
