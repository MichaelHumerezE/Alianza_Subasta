import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProposersComponent } from './proposers.component';

describe('ProposersComponent', () => {
  let component: ProposersComponent;
  let fixture: ComponentFixture<ProposersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProposersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProposersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
