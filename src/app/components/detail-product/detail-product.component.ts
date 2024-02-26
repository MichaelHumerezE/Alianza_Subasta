import { Component } from '@angular/core';
import { Product } from '../../interfaces/product';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AUCTION_STATE, URL_BACKEND_IMAGES } from '../../config/config';
import { Attribute } from '../../interfaces/attribute';
import { AttributeService } from '../../services/attribute.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SweetAlert2Service } from '../../services/sweet-alert-2.service';
import { Message } from '../../interfaces/message';

@Component({
  selector: 'app-detail-product',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './detail-product.component.html',
  styleUrl: './detail-product.component.css'
})
export class DetailProductComponent {

  id_auction!: number;
  product?: Product;
  attributes: Attribute[] = [];

  offerForm: FormGroup = new FormGroup({
    proposer_offer: new FormControl('', [Validators.required])
  });

  message: Message = {
    title: '',
    text: '',
    icon: 'info',
  };

  states = AUCTION_STATE;
  url_base = URL_BACKEND_IMAGES + 'article/';
  minimum_bid?: number;

  constructor(private productService: ProductService, private route: ActivatedRoute,
    private attributeService: AttributeService, private alert: SweetAlert2Service,
    private router: Router) { }

  ngOnInit() {
    this.readParams();
    this.loadProduct();
    this.loadAttributes();
  }

  loadProduct() {
    const formData = new FormData();
    formData.append('id', this.id_auction.toString());
    this.productService.getProductById(formData).subscribe({
      next: (productData) => {
        console.log('Respuesta de la API - GetProductById: ', productData);
        this.product = productData;
        this.minimum_bid = this.product.current_bid + this.product.minimum_increase;
      },
      error: (errorData) => {
        console.error(errorData);
      }
    });
  }

  loadAttributes() {
    const formData = new FormData();
    formData.append('id', this.id_auction.toString());
    this.attributeService.getAttributesByIdProduct(formData).subscribe({
      next: (attributesData) => {
        console.log('Respuesta de la API - GetAttributesByIdProduct: ', attributesData);
        this.attributes = attributesData;
      },
      error: (errorData) => {
        console.error(errorData);
      }
    });
  }

  readParams(): void {
    this.route.params.subscribe((params) => {
      this.id_auction = params['id_auction'];
    });
  }

  sendOffer() {
    console.log(Number(this.offerForm.get('proposer_offer')?.value) , this.minimum_bid!);
    if (Number(this.offerForm.get('proposer_offer')?.value) > this.minimum_bid!) {
      const formData = this.loadFormData();
      this.productService.sendOffer(formData);
      this.offerForm.reset();
      this.message.title = 'Enviado';
      this.message.text = 'Datos Correctos.';
      this.message.icon = 'success';
      this.alert.viewMessage(this.message);
      this.router.navigate(['/auction/' + this.product?.id + '/detail']);
    } else {
      this.message.title = '¡Valor No Valido!';
      this.message.text = 'El valor tiene que ser mayor que ' + this.minimum_bid + ' Bs.';
      this.message.icon = 'warning';
      this.alert.viewMessage(this.message);
    }
  }

  loadFormData(): FormData {
    const formData = new FormData();
    formData.append('id_proposer', '');
    formData.append('id_auction_product', '');
    formData.append('offer', this.offerForm.get('proposer_offer')?.value);
    return formData;
  }
}
