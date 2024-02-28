import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParticipatedAuctionsComponent } from './participated-auctions.component';

describe('ParticipatedAuctionsComponent', () => {
  let component: ParticipatedAuctionsComponent;
  let fixture: ComponentFixture<ParticipatedAuctionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ParticipatedAuctionsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ParticipatedAuctionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
