import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdministracionService {
  loading = new BehaviorSubject<boolean>(false);

  constructor(
    private http: HttpClient
  ) { }

  public getGastosConstantes(url: string): Observable<any> {
    return this.http.get<any>(url)
      .pipe(
        map(data => {
          // this.loading.next(false);
          return data;
        })
      )
  }

  public getGastos(url: string): Observable<any> {
    return this.http.get<any>(url)
      .pipe(
        map(data => {
          // this.loading.next(false);
          return data;
        })
      )
  }

  public postGastos(url: string, httpHeaders: {}): Observable<any> {
    return this.http.post<any>(url, httpHeaders)
      .pipe(
        map(data => {
          this.loading.next(false);
          return data;
        })
      )
  }

  public getFechas(url: string): Observable<any> {
    return this.http.get<any>(url)
      .pipe(
        map(data => {
          // this.loading.next(false);
          return data;
        })
      )
  }

  public postFechas(url: string, httpHeaders: {}): Observable<any> {
    return this.http.post<any>(url, httpHeaders)
      .pipe(
        map(data => {
          this.loading.next(false);
          return data;
        })
      )
  }
}
