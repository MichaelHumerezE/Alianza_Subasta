import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule, Location } from '@angular/common';
import { Message } from '../../interfaces/message';
import { Router, RouterLink } from '@angular/router';
import { SweetAlert2Service } from '../../services/sweet-alert-2.service';

@Component({
  selector: 'app-form-login',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './form-login.component.html',
  styleUrl: './form-login.component.css',
})
export class FormLoginComponent {
  loginForm: FormGroup = new FormGroup({
    mail: new FormControl('godofwarxv@gmail.com', [
      Validators.required,
      Validators.email,
    ]),
    password: new FormControl('123456', [Validators.required]),
  });

  message: Message = {
    title: '',
    text: '',
    icon: 'info',
  };

  constructor(
    private authService: AuthService,
    private router: Router,
    private alert: SweetAlert2Service,
    private location: Location
  ) {}

  ngOnInit(): void {}

  login() {
    const formData = this.loadFormData();
    this.authService.login(formData).subscribe({
      next: (response: any) => {
        console.log('Respuesta de la API - LOGIN: ', response);
        if (response.success) {
          this.router.navigateByUrl('/').then(() => {
            window.location.reload();
          });
        } else {
          this.message.title = 'Error!';
          this.message.text = 'Credenciales incorrectas, intentelo de nuevo.';
          this.message.icon = 'error';
          this.alert.viewMessage(this.message);
        }
      },
      error: (error) => {
        console.log('Error de la API - LOGIN: ', error);
        this.message.title = 'Error!';
        this.message.text =
          'Error al comunicarse con el servidor, intentelo de nuevo.';
        this.message.icon = 'error';
        this.alert.viewMessage(this.message);
      },
    });
  }

  loadFormData(): FormData {
    const formData = new FormData();
    formData.append('mail', this.loginForm.get('mail')?.value);
    formData.append('password', this.loginForm.get('password')?.value);
    return formData;
  }
}
