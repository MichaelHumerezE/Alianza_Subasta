import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopLastProductsComponent } from './top-last-products.component';

describe('TopLastProductsComponent', () => {
  let component: TopLastProductsComponent;
  let fixture: ComponentFixture<TopLastProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopLastProductsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TopLastProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
