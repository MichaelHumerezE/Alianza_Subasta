import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { URL_BACKEND } from '../config/config';
import { Proposer } from '../interfaces/proposer';
import { DataToInterfaceService } from './data-to-interface.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  proposer: Proposer | null = null;
  token: any = '';

  constructor(
    private http: HttpClient,
    private converter: DataToInterfaceService,
    private route: Router
  ) {
    this.loadStorage();
  }

  loadStorage(){
    if(sessionStorage.getItem('token') && sessionStorage.getItem('proposer')){
      this.proposer = JSON.parse(sessionStorage.getItem('proposer')!);
      this.token = sessionStorage.getItem('token');
    }else{
      this.token = '';
      this.proposer = null;
    }
  }

  login(formData: FormData): Observable<any> {
    let URL = URL_BACKEND + 'proposer/login_proposer';
    console.log('AUTH-SERVICE (login): ' + formData.get('password'));

    return this.http.post<any>(URL, formData).pipe(
      map((response) => {
        console.log('AUTH-SERVICE (login): ' + response);
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
    sessionStorage.setItem('token', JSON.stringify(response.token));
    sessionStorage.setItem('proposer', JSON.stringify(this.proposer));
    sessionStorage.setItem('proposer_id', JSON.stringify(this.proposer.id));
  }

  logout() {
    this.proposer = null;
    this.token = '';
    sessionStorage.removeItem('proposer');
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('proposer_id');
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
