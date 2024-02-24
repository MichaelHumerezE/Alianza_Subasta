import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-form-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './form-register.component.html',
  styleUrl: './form-register.component.css'
})
export class FormRegisterComponent {

  registerForm: FormGroup = new FormGroup({
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
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      this.validateNumber,
    ]),
    images: new FormArray([], [Validators.required, this.validateArrayLength]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  constructor(){}

  ngOnInit(): void{

  }

  validateNumber(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (isNaN(value)) {
      return { notANumber: true };
    }
    return null;
  }

  validateArrayLength(control: AbstractControl): ValidationErrors | null {
    const value = control.value as any[]; // Castear el valor como un array
    if (value && value.length !== 2) {
      return { arrayLength: true };
    }
    return null;
  }

}
