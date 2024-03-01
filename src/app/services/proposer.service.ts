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

@Injectable({
  providedIn: 'root',
})
export class ProposerService {
  constructor(private http: HttpClient, private authService: AuthService, private converter: DataToInterfaceService) {}

  getProposerById(formData: FormData): Observable<any> {
    let URL = URL_BACKEND + 'proposer/get_proposer_by_id';
    return this.http.post<any>(URL, formData, this.getHttpHeaders()).pipe(
      map((response: any) => {
        console.log('PROPOSER-SERVICE (getProposerById): ', response);
        if (response.success) {
          this.authService.saveSessionStorage(response);
          response.data = this.authService.proposer;
          return response;
        }
        return response;
      }),
      catchError(this.handleError)
    );
  }

  updateProposer(formData: FormData): Observable<any> {
    let URL = URL_BACKEND + 'proposer/edit_proposer_api';
    return this.http.post<any>(URL, formData, this.getHttpHeaders()).pipe(
      map((response: any) => {
        console.log('PROPOSER-SERVICE (updateProposer): ', response);
        if (response.success) {
          response.token = this.authService.token;
          this.authService.saveSessionStorage(response);
        }
        return response;
      }),
      catchError(this.handleError)
    );
  }

  getHttpHeaders() {
    // Obtener el token de sessionStorage
    const tokenConComillas = this.authService.token;

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
