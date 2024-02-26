import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { Attribute } from '../interfaces/attribute';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { DataToInterfaceService } from './data-to-interface.service';

@Injectable({
  providedIn: 'root'
})
export class AttributeService {

  constructor(private http: HttpClient, private converter: DataToInterfaceService) { }

  getAttributesByIdProduct(formData: FormData): Observable<Attribute[]> {
    //let URL = URL_BACKEND + 'proposer/login_proposer';
    //return this.http.post<any>(URL)
    return this.http
      .get<any>('../../assets/data/data-attribute.json')
      .pipe(map((response: any) => {
        return this.converter.dataToInterfaceAttributes(response);
      }),
        catchError(this.handleError));
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
