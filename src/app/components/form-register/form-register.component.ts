import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ImgDropZoneComponent } from '../img-drop-zone/img-drop-zone.component';
import { SweetAlert2Service } from '../../services/sweet-alert-2.service';
import { Message } from '../../interfaces/message';
import { AuthService } from '../../services/auth.service';
import { Response } from '../../interfaces/response';

@Component({
  selector: 'app-form-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink, ImgDropZoneComponent],
  templateUrl: './form-register.component.html',
  styleUrl: './form-register.component.css'
})
export class FormRegisterComponent {

  registerForm: FormGroup = new FormGroup({
    name: new FormControl('default', [Validators.required, Validators.minLength(3)]),
    surname: new FormControl('default', [
      Validators.required,
      Validators.minLength(3),
    ]),
    ci: new FormControl('11111111', [
      Validators.required,
      Validators.minLength(6),
      this.validateNumber,
    ]),
    email: new FormControl('default@gmail.com', [Validators.required, Validators.email]),
    phone: new FormControl('111111111', [
      Validators.required,
      Validators.minLength(6),
      this.validateNumber,
    ]),
    password: new FormControl('123456', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  files: File[] = [];

  message: Message = {
    title: '',
    text: '',
    icon: 'info',
  };

  constructor(private alert: SweetAlert2Service, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {

  }

  validateNumber(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (isNaN(value)) {
      return { notANumber: true };
    }
    return null;
  }

  register(): void {
    if (this.files.length == 2) {
      const formData = this.loadFormData();
      this.authService.register(formData).subscribe({
        next: (response: Response) => {
          console.log('Respuesta de la API-REGISTER:', response);
          this.message.title = 'Enviado';
          this.message.text =
            'Datos registrados correctamente, en espera de ser verificado.';
          this.message.icon = 'success';
          this.alert.viewMessage(this.message);
          this.router.navigate(['/login']);
        },
        error: (error) => {
          console.error('Error al enviar los datos:', error);
          this.message.title = 'Error!';
          this.message.text =
            'Error al comunicarse con el servidor, intentelo de nuevo.';
          this.message.icon = 'error';
          this.alert.viewMessage(this.message);
        },
      });
    } else {
      this.message.title = "¡Debe Subir 2 Imágenes!";
      this.message.text = "Solo se permite cargar un máximo de 2 imagenes, por favor seleccione 2 imágenes";
      this.message.icon = "warning";
      this.alert.viewMessage(this.message);
    }
  }

  loadFormData(): FormData {
    const formData = new FormData();
    // Agregar datos al FormData
    formData.append('name', this.registerForm.get('name')?.value);
    formData.append('surname', this.registerForm.get('surname')?.value);
    formData.append('ci', this.registerForm.get('ci')?.value);
    formData.append('mail', this.registerForm.get('email')?.value);
    formData.append('phone', this.registerForm.get('phone')?.value);
    formData.append('password', this.registerForm.get('password')?.value);
    // Iterar sobre los controles del FormArray y agregar cada archivo individualmente al FormData
    this.files.forEach(file => {
      formData.append('images[]', file, file.name);
    });
    return formData;
  }
}
