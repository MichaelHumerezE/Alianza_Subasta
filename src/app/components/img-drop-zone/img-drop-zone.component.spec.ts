import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImgDropZoneComponent } from './img-drop-zone.component';

describe('ImgDropZoneComponent', () => {
  let component: ImgDropZoneComponent;
  let fixture: ComponentFixture<ImgDropZoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImgDropZoneComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ImgDropZoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
