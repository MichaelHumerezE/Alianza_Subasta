import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormUpdateProfileComponent } from './form-update-profile.component';

describe('FormUpdateProfileComponent', () => {
  let component: FormUpdateProfileComponent;
  let fixture: ComponentFixture<FormUpdateProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormUpdateProfileComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormUpdateProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
