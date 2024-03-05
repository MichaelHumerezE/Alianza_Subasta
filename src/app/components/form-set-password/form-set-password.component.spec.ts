import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormSetPasswordComponent } from './form-set-password.component';

describe('FormSetPasswordComponent', () => {
  let component: FormSetPasswordComponent;
  let fixture: ComponentFixture<FormSetPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormSetPasswordComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormSetPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
