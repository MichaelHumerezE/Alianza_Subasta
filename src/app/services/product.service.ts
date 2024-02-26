import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, model } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { Product } from '../interfaces/product';
import { URL_BACKEND } from '../config/config';
import { DataToInterfaceService } from './data-to-interface.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient, private converter: DataToInterfaceService) { }

  getProducts(): Observable<Product[]> {
    //let URL = URL_BACKEND + 'proposer/login_proposer';
    //return this.http.get<any>(URL)
    return this.http
      .get<any>('../../assets/data/data-product.json')
      .pipe(map((response: any) => {
        return this.converter.dataToInterfaceProducts(response);
      }),
        catchError(this.handleError));
  }

  getProductById(formData: FormData): Observable<Product> {
    //let URL = URL_BACKEND + 'proposer/login_proposer';
    //return this.http.post<any>(URL)
    return this.http
      .get<any>('../../assets/data/data-product-detail.json')
      .pipe(map((response: any) => {
        return this.converter.dataToInterfaceProduct(response);
      }),
        catchError(this.handleError));
  }

  sendOffer(formData: FormData) {
    //let URL = URL_BACKEND + 'proposer/login_proposer';
    //return this.http.post<any>(URL)
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