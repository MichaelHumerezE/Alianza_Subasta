import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable, model } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { Product } from '../interfaces/product';
import { URL_BACKEND } from '../config/config';
import { DataToInterfaceService } from './data-to-interface.service';
import { Response } from '../interfaces/response';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient, private converter: DataToInterfaceService, private authService: AuthService) { }

  getProducts(): Observable<Product[]> {
    let URL = URL_BACKEND + 'bidding/get_biddings';
    return this.http.get<Response>(URL).pipe(map((response: Response) => {
      return this.converter.dataToInterfaceProducts(response.data!);
    }),
      catchError(this.handleError));
    /*return this.http
      .get<any>('../../assets/data/data-product.json')
      .pipe(map((response: any) => {
        return this.converter.dataToInterfaceProducts(response);
      }),
        catchError(this.handleError));*/
  }

  getProductById(formData: FormData): Observable<Product> {
    let URL = URL_BACKEND + 'article/get_article';
    return this.http.post<any>(URL, formData).pipe(map((response: Response) => {
      return this.converter.dataToInterfaceProduct(response.data);
    }),
      catchError(this.handleError));
    /*return this.http
      .get<any>('../../assets/data/data-product-detail.json')
      .pipe(map((response: any) => {
        return this.converter.dataToInterfaceProduct(response);
      }),
        catchError(this.handleError));*/
  }

  getProductsByIdProposer(formData: FormData): Observable<Product[]> {
    let URL = URL_BACKEND + 'bidding/get_biddings_article_by_proposer';
    return this.http.post<any>(URL, formData, this.getHttpHeaders()).pipe(map((response: Response) => {
      console.log(response);
      return this.converter.dataToInterfaceProducts(response.data!);
    }),
      catchError(this.handleError));
    /*return this.http
      .get<any>('../../assets/data/data-product-detail.json')
      .pipe(map((response: any) => {
        return this.converter.dataToInterfaceProduct(response);
      }),
        catchError(this.handleError));*/
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
