import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataToInterfaceService } from './data-to-interface.service';
import { Observable, catchError, map, throwError } from 'rxjs';
import { URL_BACKEND } from '../config/config';
import { Offer } from '../interfaces/offer';
import { Response } from '../interfaces/response';
import { Message } from '../interfaces/message';
import { SweetAlert2Service } from './sweet-alert-2.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class OfferService {
  message: Message = {
    title: '',
    text: '',
    icon: 'info',
  };

  constructor(
    private http: HttpClient,
    private converter: DataToInterfaceService,
    private alert: SweetAlert2Service,
    private authService: AuthService
  ) {}

  getOffersByProduct(formData: FormData): Observable<Offer[]> {
    let URL = URL_BACKEND + 'article/get_offers';
    this.authService.getHttpHeaders();
    return this.http.post<any>(URL, formData).pipe(
      map((response: Response) => {
        return this.converter.dataToInterfaceOffers(response.data!);
      }),
      catchError(this.handleError)
    );
  }

  registerOffer(formData: FormData): Observable<any> {
    let URL = URL_BACKEND + 'bidding/store_offers';
    return this.http
      .post<any>(URL, formData, this.authService.getHttpHeaders())
      .pipe(
        map((response: any) => {
          console.log('Respuesta de la API - registerOffer: ', response);
          if (response.success) {
            this.message.title = 'Éxito';
            this.message.text = 'Monto Registrada Correctamente';
            this.message.icon = 'success';
          } else {
            this.message.title = 'Error!';
            this.message.text = response.messages ?? '';
            this.message.icon = 'error';
          }
          this.alert.viewMessage(this.message);
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
