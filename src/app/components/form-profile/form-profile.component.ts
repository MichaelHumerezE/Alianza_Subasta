import { Component } from '@angular/core';
import { ImgDropZoneComponent } from '../img-drop-zone/img-drop-zone.component';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Proposer } from '../../interfaces/proposer';
import { SweetAlert2Service } from '../../services/sweet-alert-2.service';

@Component({
  selector: 'app-form-profile',
  standalone: true,
  imports: [ImgDropZoneComponent, ReactiveFormsModule, CommonModule],
  templateUrl: './form-profile.component.html',
  styleUrl: './form-profile.component.css'
})
export class FormProfileComponent {

  updateForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    surname: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    ci: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      this.validateNumber,
    ]),
    mail: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      this.validateNumber,
    ]),
    password: new FormControl('', [Validators.minLength(6)]),
    new_password: new FormControl('', [Validators.minLength(6)]),
  });

  proposer?: Proposer;

  constructor(private alert: SweetAlert2Service){}

  ngOnInit(){}

  validateNumber(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (isNaN(value)) {
      return { notANumber: true };
    }
    return null;
  }

}
