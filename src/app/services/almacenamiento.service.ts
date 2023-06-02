import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AlmacenamientoService {

  public datosDeValidarFecha : Object = {};
  public datosDeObtenerDatosApi : Object = {};
  public datosDeAgregarDatosApi : Object = {};

  constructor() { }

  //
  setDatosValidarFecha(idDeHoy : number,fechasExistentes : number)
  {
    this.datosDeValidarFecha =
    {
      "idDeHoy":idDeHoy,
      "fechasExistentes":fechasExistentes
    }
  }
  getDatosValidarFecha()
  {
    return this.datosDeValidarFecha;
  }

  //
  setDatosObtenerDatosApi(data : Object)
  {
    this.datosDeObtenerDatosApi = data;
  }
  getDatosObtenerDatosApi()
  {
    return this.datosDeObtenerDatosApi;
  }

  //
  setDatosAgregarDatosApi(put : Object, id : number)
  {
    this.datosDeAgregarDatosApi =
    {
      "put":put,
      "id":id
    };
  }
  getDatosAgregarDatosApi()
  {
    return this.datosDeAgregarDatosApi;
  }
}
