import { Component } from '@angular/core';
import { ImgDropZoneComponent } from '../img-drop-zone/img-drop-zone.component';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Proposer } from '../../interfaces/proposer';
import { SweetAlert2Service } from '../../services/sweet-alert-2.service';
import { URL_BACKEND_IMAGES } from '../../config/config';
import { ProposerService } from '../../services/proposer.service';
import { AuthService } from '../../services/auth.service';
import { Message } from '../../interfaces/message';

@Component({
  selector: 'app-form-profile',
  standalone: true,
  imports: [ImgDropZoneComponent, ReactiveFormsModule, CommonModule],
  templateUrl: './form-profile.component.html',
  styleUrl: './form-profile.component.css',
})
export class FormProfileComponent {
  updateForm: FormGroup = new FormGroup({
    name: new FormControl(this.authService.proposer?.name, [
      Validators.required,
      Validators.minLength(3),
    ]),
    surname: new FormControl(this.authService.proposer?.surname, [
      Validators.required,
      Validators.minLength(3),
    ]),
    ci: new FormControl(this.authService.proposer?.ci, [
      Validators.required,
      Validators.minLength(6),
      this.validateNumber,
    ]),
    mail: new FormControl(this.authService.proposer?.email, [Validators.required, Validators.email]),
    phone: new FormControl(this.authService.proposer?.phone, [
      Validators.required,
      Validators.minLength(6),
      this.validateNumber,
    ]),
    password: new FormControl('', [Validators.minLength(6)]),
    new_password: new FormControl('', [Validators.minLength(6)]),
  });

  message: Message = {
    title: '',
    text: '',
    icon: 'info',
  };

  url_base = URL_BACKEND_IMAGES + 'proposers/';

  constructor(
    private alert: SweetAlert2Service,
    private proposerService: ProposerService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.loadProposer();
  }

  validateNumber(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (isNaN(value)) {
      return { notANumber: true };
    }
    return null;
  }

  loadProposer() {
    const formData = this.loadFormDataLoad();
    this.proposerService.getProposerById(formData).subscribe({
      next: (response: any) => {
        console.log('Respuesta de la API - getProposerById:', response);
        if (response.success) {
          this.message.title = 'Éxito';
          this.message.text = 'Información Recuperada Correctamente';
          this.message.icon = 'success';
          this.alert.viewMessage(this.message);
        } else {
          this.message.title = '¡Token Expirado!';
          this.message.text =
            response.message + ', por favor vuelva a iniciar sesión.';
          this.message.icon = 'warning';
          this.authService.logout();
        }
      },
      error: (error) => {
        console.log('Error de la API-REGISTER:', error);
        this.message.title = 'Error!';
        this.message.text =
          'Error al comunicarse con el servidor, intentelo de nuevo.';
        this.message.icon = 'error';
        this.alert.viewMessage(this.message);
      },
    });
  }

  updateProposer() {
    const formData = this.loadFormDataUpdate();
    this.proposerService.updateProposer(formData).subscribe({
      next: (response) => {
        console.log('Respuesta de la API - updateProposer:', response);
        if (response.success) {
          this.message.title = 'Éxito';
          this.message.text = 'Información Recuperada Correctamente';
          this.message.icon = 'success';
          this.alert.viewMessage(this.message);
        } else {
          this.message.title = '¡Token Expirado!';
          this.message.text =
            response.message + ', por favor vuelva a iniciar sesión.';
          this.message.icon = 'warning';
          this.authService.logout();
        }
      },
      error: (error) => {
        console.log('Error de la API - updateProposer:', error);
        this.message.title = 'Error!';
        this.message.text =
          'Error al comunicarse con el servidor, intentelo de nuevo.';
        this.message.icon = 'error';
        this.alert.viewMessage(this.message);
      },
    });
  }

  loadFormDataLoad(): FormData {
    const formData = new FormData();
    formData.append('id', this.authService.proposer?.id!);
    return formData;
  }

  loadFormDataUpdate(): FormData {
    const formData = new FormData();
    formData.append('id', this.authService.proposer?.id ?? '');
    formData.append('name', this.updateForm.get('name')?.value);
    formData.append('surname', this.updateForm.get('surname')?.value);
    formData.append('ci', this.updateForm.get('ci')?.value);
    formData.append('mail', this.updateForm.get('mail')?.value);
    formData.append('phone', this.updateForm.get('phone')?.value);
    formData.append('password', this.updateForm.get('password')?.value);
    formData.append('new_password', this.updateForm.get('new_password')?.value);
    formData.forEach(function (value, key) {
      console.log(key, value);
    });
    return formData;
  }
}
