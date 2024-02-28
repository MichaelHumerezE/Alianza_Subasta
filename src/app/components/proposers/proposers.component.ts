import { Component, Input } from '@angular/core';
import { TableModule } from '@coreui/angular';
import { Offer } from '../../interfaces/offer';
import { OfferService } from '../../services/offer.service';

@Component({
  selector: 'app-proposers',
  standalone: true,
  imports: [TableModule],
  templateUrl: './proposers.component.html',
  styleUrl: './proposers.component.css'
})
export class ProposersComponent {

  @Input() product_id: string = '';

  offers: Offer[] = [];

  constructor(private offerService: OfferService){}

  ngOnInit(){
    this.loadOffers();
    console.log(this.offers);
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
    formData.append('id', this.product_id);
    return formData;
  }

}
