import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, startWith, catchError } from 'rxjs/operators';

export enum LoadingStatus {
  SUCCESS = 'Success',
  ERROR = 'Error',
  LOADING = 'Loading'
}

@Injectable({
  providedIn: 'root'
})
export class LoadingWrapperService<T> {
  status: LoadingStatus;
  data: T;
  error: Error;

  constructor() {}

  static wrap<T>(observable: Observable<T>): Observable<LoadingWrapperService<T>> {
    return observable.pipe(
      map(data => ({ status: LoadingStatus.SUCCESS, data: data, error: null })),
      startWith({ status: LoadingStatus.LOADING, data: null, error: null }),
      catchError((error: Error) => {
        return of({ status: LoadingStatus.ERROR, data: null, error: error });
      })
    );
  }
}
