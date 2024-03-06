import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { URL_BACKEND } from '../config/config';
import { Proposer } from '../interfaces/proposer';
import { DataToInterfaceService } from './data-to-interface.service';
import { Router } from '@angular/router';
import { SweetAlert2Service } from './sweet-alert-2.service';
import { Message } from '../interfaces/message';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  proposer: Proposer | null = null;
  token: any = '';

  message: Message = {
    title: '',
    text: '',
    icon: 'info',
  };

  constructor(
    private http: HttpClient,
    private converter: DataToInterfaceService,
    private route: Router,
    private alert: SweetAlert2Service
  ) {
    this.loadStorage();
  }

  loadStorage() {
    if (sessionStorage.getItem('token') && sessionStorage.getItem('proposer')) {
      this.proposer = JSON.parse(sessionStorage.getItem('proposer')!);
      this.token = sessionStorage.getItem('token');
    } else {
      this.logout();
    }
  }

  login(formData: FormData): Observable<any> {
    let URL = URL_BACKEND + 'proposer/login_proposer';
    return this.http.post<any>(URL, formData).pipe(
      map((response) => {
        console.log('AUTH-SERVICE (login): ', response);
        if (response.success) {
          this.saveSessionStorage(response);
        }
        return response;
      }),
      catchError(this.handleError)
    );
  }

  register(formData: FormData): Observable<any> {
    let URL = URL_BACKEND + 'proposer/register_proposer';
    return this.http.post<any>(URL, formData);
  }

  saveSessionStorage(response: any) {
    this.proposer = this.converter.dataToInterfaceProposer(response.data);
    this.token = response.token;
    if (this.token) {
      sessionStorage.setItem('token', JSON.stringify(response.token));
    }
    sessionStorage.setItem('proposer', JSON.stringify(this.proposer));
    sessionStorage.setItem('proposer_id', JSON.stringify(this.proposer.id));
  }

  logout() {
    this.proposer = null;
    this.token = '';
    sessionStorage.removeItem('proposer');
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('proposer_id');
    //message
    //his.message.title = 'Sesion Cerrada';
    //his.message.icon = 'warning';
    //his.alert.viewMessage(this.message);
    //his.route.navigate(['/login']);
  }

  getProposerLocal(): Proposer {
    return this.proposer as Proposer;
  }

  getHttpHeaders() {
    // Obtener el token de sessionStorage
    const tokenConComillas = sessionStorage.getItem('token');

    // Quitar las comillas del token si están presentes
    const token = tokenConComillas
      ? tokenConComillas.replace(/^"(.*)"$/, '$1')
      : '';

    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
      }),
    };
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
