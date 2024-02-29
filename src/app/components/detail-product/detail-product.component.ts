import { Component } from '@angular/core';
import { Product } from '../../interfaces/product';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AUCTION_STATE, URL_BACKEND_IMAGES } from '../../config/config';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SweetAlert2Service } from '../../services/sweet-alert-2.service';
import { Message } from '../../interfaces/message';
import { CarouselComponent } from '../carousel/carousel.component';
import { OffersComponent } from '../offers/offers.component';
import { OfferService } from '../../services/offer.service';
import { AuthService } from '../../services/auth.service';
import { AttributesComponent } from '../attributes/attributes.component';

@Component({
  selector: 'app-detail-product',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CarouselComponent,
    OffersComponent,
    AttributesComponent,
  ],
  templateUrl: './detail-product.component.html',
  styleUrl: './detail-product.component.css',
})
export class DetailProductComponent {
  id_auction!: number;
  product?: Product;

  offerForm: FormGroup = new FormGroup({
    proposer_offer: new FormControl('', [Validators.required]),
  });

  message: Message = {
    title: '',
    text: '',
    icon: 'info',
  };

  states = AUCTION_STATE;
  url_base = URL_BACKEND_IMAGES + 'article/';
  minimum_bid?: number;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private alert: SweetAlert2Service,
    private offerService: OfferService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.readParams();
    this.loadProduct();
  }

  loadProduct() {
    const formData = new FormData();
    formData.append('id', this.id_auction.toString());
    this.productService.getProductById(formData).subscribe({
      next: (productData) => {
        console.log('Respuesta de la API - GetProductById: ', productData);
        this.product = productData;
        this.minimum_bid =
          Number(this.product.current_bid) +
          Number(this.product.minimum_increase);
      },
      error: (errorData) => {
        console.error(errorData);
      },
    });
  }

  readParams(): void {
    this.route.params.subscribe((params) => {
      this.id_auction = params['id_auction'];
    });
  }

  sendOffer() {
    if (
      Number(this.offerForm.get('proposer_offer')?.value) >= this.minimum_bid!
    ) {
      if (this.verifyState()) {
        const formData = this.loadFormData();
        this.offerService.registerOffer(formData).subscribe({
          next: (attributesData) => {
            this.message.title = 'Enviado';
            this.message.text = 'Datos Correctos.';
            this.message.icon = 'success';
            this.alert.viewMessage(this.message);
            this.loadProduct();
          },
        });
      }
    } else {
      this.message.title = '¡Valor No Valido!';
      this.message.text =
        'El valor tiene que ser mayor que ' + this.minimum_bid + ' Bs.';
      this.message.icon = 'warning';
      this.alert.viewMessage(this.message);
    }
  }

  loadFormData(): FormData {
    const formData = new FormData();
    formData.append('proposer_id', this.authService.proposer?.id!);
    formData.append('bidding_article_id', this.product?.id.toString()!);
    formData.append('bid', this.offerForm.get('proposer_offer')?.value);
    return formData;
  }

  verifyState(): boolean {
    if (this.product?.state != 2) {
      this.message.title = '¡No Disponible!';
      this.message.text = 'Producto ya no disponible para la subasta';
      this.message.icon = 'warning';
      this.alert.viewMessage(this.message);
      return false;
    }
    return true;
  }
}
