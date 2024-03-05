import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailNotificationsComponent } from './detail-notifications.component';

describe('DetailNotificationsComponent', () => {
  let component: DetailNotificationsComponent;
  let fixture: ComponentFixture<DetailNotificationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailNotificationsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetailNotificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
