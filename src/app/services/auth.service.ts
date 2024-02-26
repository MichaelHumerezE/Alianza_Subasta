import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { URL_BACKEND } from '../config/config';
import { Proposer } from '../interfaces/proposer';
import { DataToInterfaceService } from './data-to-interface.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  proposer!: Proposer;
  token: any = '';

  constructor(private http: HttpClient, private converter: DataToInterfaceService) {}

  login(formData: FormData): Observable<any> {
    let URL = 'proposer/login_proposer';
    return this.http.post<any>(URL_BACKEND + URL, formData).pipe(
      map((response: any) => {
        console.log('SERVICE: ' + response.success);
        if (response.success) {
          this.proposer = this.converter.dataToInterfaceProposer(response.data);
          this.token = response.token;

          sessionStorage.setItem('token', JSON.stringify(response.token));
          sessionStorage.setItem('proposer', JSON.stringify(this.proposer));
          sessionStorage.setItem(
            'proposer_id',
            JSON.stringify(this.proposer.id)
          );
        }

        return response;
      }),
      catchError(this.handleError)
    );
  }

  register(formData: FormData): Observable<any> {
    let URL = 'proposer/register_proposer';
    return this.http.post<any>(URL_BACKEND + URL, formData);
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
