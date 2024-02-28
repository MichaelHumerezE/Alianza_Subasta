import { Component, Input } from '@angular/core';
import { TableModule } from '@coreui/angular';
import { Product } from '../../interfaces/product';
import { Attribute } from '../../interfaces/attribute';
import { AttributeService } from '../../services/attribute.service';

@Component({
  selector: 'app-attributes',
  standalone: true,
  imports: [TableModule],
  templateUrl: './attributes.component.html',
  styleUrl: './attributes.component.css',
})
export class AttributesComponent {
  @Input() product?: Product;

  attributes: Attribute[] = [];

  constructor(private attributeService: AttributeService) {}

  ngOnInit() {
    this.loadAttributes();
  }

  ngOnChanges() {
    if (this.product) {
      this.loadAttributes();
    }
  }

  loadAttributes() {
    const formData = this.loadFormData();
    this.attributeService.getAttributesByIdProduct(formData).subscribe({
      next: (attributesData) => {
        this.attributes = attributesData;
      },
    });
  }

  loadFormData(): FormData {
    const formData = new FormData();
    formData.append('id', this.product?.id.toString()!);
    return formData;
  }
}
