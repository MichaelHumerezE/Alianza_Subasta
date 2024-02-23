import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailAuctionComponent } from './detail-auction.component';

describe('DetailAuctionComponent', () => {
  let component: DetailAuctionComponent;
  let fixture: ComponentFixture<DetailAuctionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailAuctionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetailAuctionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
