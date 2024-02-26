import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataToInterfaceService } from './data-to-interface.service';
import { Observable, catchError, map, throwError } from 'rxjs';
import { Category } from '../interfaces/category';
import { URL_BACKEND } from '../config/config';
import { Response } from '../interfaces/response';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient, private converter: DataToInterfaceService) { }

  ngOnInit(){}

  getCategories(): Observable<Category[]> {
    let URL = URL_BACKEND + 'category/get_list_category';
    return this.http.get<Response>(URL).pipe(map((response: any) => {
      return this.converter.dataToInterfaceCategories(response.data);
    }),
      catchError(this.handleError));
    /*return this.http
      .get<any>('../../assets/data/data-category.json')
      .pipe(map((response: any) => {
        return this.converter.dataToInterfaceCategories(response);
      }),
        catchError(this.handleError));*/
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
