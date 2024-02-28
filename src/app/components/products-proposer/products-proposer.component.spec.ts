import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsProposerComponent } from './products-proposer.component';

describe('ProductsProposerComponent', () => {
  let component: ProductsProposerComponent;
  let fixture: ComponentFixture<ProductsProposerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductsProposerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProductsProposerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
