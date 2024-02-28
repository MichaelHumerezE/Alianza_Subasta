import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataToInterfaceService } from './data-to-interface.service';
import { Observable, catchError, map, throwError } from 'rxjs';
import { URL_BACKEND } from '../config/config';
import { Offer } from '../interfaces/offer';
import { Response } from '../interfaces/response';

@Injectable({
  providedIn: 'root',
})
export class OfferService {
  constructor(
    private http: HttpClient,
    private converter: DataToInterfaceService
  ) {}

  getOffersByProduct(formData: FormData): Observable<Offer[]> {
    let URL = URL_BACKEND + 'article/get_offers';
    return this.http.post<any>(URL, formData).pipe(
      map((response: Response) => {
        return this.converter.dataToInterfaceOffers(response.data!);
      }),
      catchError(this.handleError)
    );
  }

  registerOffer(formData: FormData): Observable<Offer> {
    let URL = URL_BACKEND + 'bidding/store_offers';
    return this.http.post<any>(URL, formData).pipe(
      map((response: Response) => {
        console.log('Respuesta de la API - registerOffer: ', response);
        return this.converter.dataToInterfaceOffer(response.data!);
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
