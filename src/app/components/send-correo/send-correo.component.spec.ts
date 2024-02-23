import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendCorreoComponent } from './send-correo.component';

describe('SendCorreoComponent', () => {
  let component: SendCorreoComponent;
  let fixture: ComponentFixture<SendCorreoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SendCorreoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SendCorreoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
