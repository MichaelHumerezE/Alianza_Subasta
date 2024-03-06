import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { URL_BACKEND } from '../config/config';
import { AuthService } from './auth.service';
import { DataToInterfaceService } from './data-to-interface.service';
import { Response } from '../interfaces/response';
import { SweetAlert2Service } from './sweet-alert-2.service';
import { Message } from '../interfaces/message';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ProposerService {
  message: Message = {
    title: '',
    text: '',
    icon: 'info',
  };

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private converter: DataToInterfaceService,
    private alert: SweetAlert2Service,
    private router: Router
  ) { }

  getProposerById(formData: FormData): Observable<any> {
    let URL = URL_BACKEND + 'proposer/get_proposer_by_id';
    return this.http
      .post<any>(URL, formData, this.authService.getHttpHeaders())
      .pipe(
        map((response: any) => {
          console.log('PROPOSER-SERVICE (getProposerById): ', response);
          if (response.success) {
            console.log('PROPOSER-SERVICE (getProposerById): ', response);
            this.authService.saveSessionStorage(response);
            response.data = this.authService.proposer;
          } else {
            this.message.title = '¡Error!';
            this.message.text = response.messages;
            this.message.icon = 'warning';
            this.alert.viewMessage(this.message);
            this.authService.logout();
            this.router.navigate(['/login']);
          }
          return response;
        }),
        catchError(this.handleError)
      );
  }

  updateProposer(formData: FormData): Observable<any> {
    let URL = URL_BACKEND + 'proposer/edit_proposer_api';
    return this.http
      .post<any>(URL, formData, this.authService.getHttpHeaders())
      .pipe(
        map((response: any) => {
          console.log('PROPOSER-SERVICE (updateProposer): ', response);
          if (response.success) {
            response.token = this.authService.token;
            this.authService.saveSessionStorage(response);
            this.message.title = 'Éxito';
            this.message.text = 'Datos actualizados correctamente';
            this.message.icon = 'success';
          } else {
            this.message.title = 'Error!';
            this.message.text = response.messages;
            this.message.icon = 'warning';
            this.authService.logout();
            this.router.navigate(['/login']);
          }
          this.alert.viewMessage(this.message);
          return response;
        }),
        catchError(this.handleError)
      );
  }

  sendEmailPasswordProposer(formData: FormData) {
    let URL = URL_BACKEND + 'proposer/forgot_password';
    return this.http.post<Response>(URL, formData).pipe(
      map((response: Response) => {
        console.log('PROPOSER-SERVICE (sendEmailPasswordProposer): ', response);
        if (response.success) {
          this.message.title = 'Éxito';
          this.message.text = 'Correo electrónico enviado correctamente';
          this.message.icon = 'success';
        } else {
          this.message.title = 'Error!';
          this.message.text = response.message ?? '';
          this.message.icon = 'error';
        }
        this.alert.viewMessage(this.message);
      }),
      catchError(this.handleError)
    );
  }

  setPasswordProposer(formData: FormData, hash: string) {
    let URL = URL_BACKEND + 'proposer/change_password/' + hash;
    return this.http.post<Response>(URL, formData).pipe(
      map((response: Response) => {
        console.log('PROPOSER-SERVICE (setPasswordProposer): ', response);
        if (response.success) {
          this.message.title = 'Éxito';
          this.message.text = 'Contraseña modificada correctamente';
          this.message.icon = 'success';
        } else {
          this.message.title = 'Error!';
          this.message.text = response.message ?? '';
          this.message.icon = 'error';
        }
        this.alert.viewMessage(this.message);
      }),
      catchError(this.handleError)
    );
  }

  verifyHashPassword(hash: string) {
    let URL = URL_BACKEND + 'proposer/change_password/' + hash;
    return this.http.get<Response>(URL).pipe(
      map((response: Response) => {
        console.log('PROPOSER-SERVICE (verifyHashPassword): ', response);
        if (!response.success) {
          this.message.title = 'Error!';
          this.message.text = response.message ?? '';
          this.message.icon = 'error';
          this.alert.viewMessage(this.message);
          //this.router.navigate(['/forgot-password/send-email']);
        }
      }),
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('Se ha producido un error', error.error);
    } else {
      console.error(
        'Backend retornó el código de estado ',
        error.status,
        error.error
      );
    }
    return throwError(
      () => new Error('Algo falló. Por favor intente nuevamente.')
    );
  }
}
