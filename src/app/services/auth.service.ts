import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, map, throwError } from 'rxjs';
import { URL_BACKEND } from '../config/config';
import { Proposer } from '../interfaces/proposer';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  proposer!: Proposer;
  token: any = '';

  login(formData: FormData): Observable<any> {
    let URL = 'proposer/login_proposer';
    return this.http.post<any>(URL_BACKEND + URL, formData).pipe(
      map((response: any) => {
        console.log('SERVICE: ' + response.success);
        if (response.success) {
          this.proposer = this.ModelToInterfaceProposer(response.data);
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

  ModelToInterfaceProposer(data: any): Proposer {
    return {
      id: data.id,
      name: data.nombre,
      surname: data.apellido,
      ci: data.ci,
      email: data.correo,
      phone: data.telefono,
      url_img_1: data.url_img_1,
      url_img_2: data.url_img_2,
      verify: data.verificado,
      // Puedes incluir otros atributos de userData que coincidan con los de la interfaz Usuario
    } as Proposer;
  }
}
