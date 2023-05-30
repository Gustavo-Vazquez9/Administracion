import { Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import { HttpClient} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  loading = new BehaviorSubject<boolean>(false);
  public guardarNomina : number = 0;

  constructor(
    private http: HttpClient
    ) { }

  setLoading()
  {
    this.loading.next(true);
    return this.http.get<any>('https://jsonplaceholder.typicode.com/todos/1').pipe(
      tap( () =>
      {
        this.loading.next(false);
      })
    )
  }

  //informacion de la nomina
  setNomina(valor : number)
  {
    this.guardarNomina = valor;
    localStorage.setItem('nomina', JSON.stringify(valor));
  }

  getNomina()
  {
    if(!this.guardarNomina)
    {
      this.guardarNomina = JSON.parse(localStorage.getItem('nomina') || '{}');
    }
    return this.guardarNomina;
  }
}
