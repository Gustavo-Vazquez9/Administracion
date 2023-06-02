import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { concatMap } from 'rxjs';
import { AdministracionService } from 'src/app/services/administracion.service';
import { AlmacenamientoService } from 'src/app/services/almacenamiento.service';

@Component({
  selector: 'app-agregar-gasto',
  templateUrl: './agregar-gasto.component.html',
  styleUrls: ['./agregar-gasto.component.css'],
  providers:[DatePipe]
})
export class AgregarGastoComponent {
  //
  public gastoIngresado : string[] = [];
  public montoIngresado : number[] = [];
  public descripcionIngresado : string[] = []
  public colorIngresado : string[] = [];
  public hoverIngresado : string[] = [];
  public idFechas : any;
  public put:any;

  //
  public loading = false;
  public gastos : Object[] = [];
  formGroup!: FormGroup;
  public postFechas:any;
  public fecha : Date = new Date();
  public opcionesFecha = { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' };
  public fechaHoy : number|string = "no";
  public id : number = 0;
  //listo
  constructor(
    private formBuilder: FormBuilder,
    private ref: DynamicDialogRef,
    private adminService : AdministracionService,
    private almaService : AlmacenamientoService,
    private datePipe: DatePipe
  ){}

  ngOnInit() {

    this.adminService.getGastos("https://api-administracion-9e580-default-rtdb.firebaseio.com/gastos.json")
    .subscribe( (data) =>
    {
      this.id = data.length;
    });

    this.formGroup = this.formBuilder.group(
      {
        gasto: ['', [Validators.required]],
        monto: ['', [Validators.required]],
        descripcion: ['', []],
        color: ['', [Validators.required]],
        colorhover: ['', [Validators.required]],
      }
    );
  }

  //listo
  agregarGasto()
  {
    if(this.formGroup.status != "INVALID")
    {
      this.gastoIngresado.push(this.formGroup.value['gasto']);
      this.montoIngresado.push(parseInt(this.formGroup.value['monto']));
      this.descripcionIngresado.push(this.formGroup.value['descripcion']);
      this.colorIngresado.push(this.formGroup.value['color']);
      this.hoverIngresado.push(this.formGroup.value['colorhover']);
      this.gastos.push(this.formGroup.value);
      this.limpiar();
    }
  }

  //listo
  limpiar() {

    this.formGroup.reset();
  }

  guardarGasto()
  {
    this.validarFecha();
  }

  //listo
  validarFecha() {
    this.adminService.getFechas("https://api-administracion-9e580-default-rtdb.firebaseio.com/fechas.json")
    .subscribe( (data) =>
    {
      data.forEach((item : any) => {
        if(item.fecha === this.datePipe.transform(this.fecha, 'MMM dd, yyyy'))
        {
          this.fechaHoy = item.id;
        }
      });
      this.obtenerDatosApi(this.fechaHoy,data.length);
    });

  }

  //listo
  agregarFechas( ultimoIdDeFechas : number)
  {
    let aumentaElUltimoId = ultimoIdDeFechas+1;
    this.postFechas = {
      "id": aumentaElUltimoId,
      "fecha": this.datePipe.transform(this.fecha, 'MMM dd, yyyy')
    }
    this.adminService.postFechas("https://api-administracion-9e580-default-rtdb.firebaseio.com/fechas.json", this.postFechas)
    .subscribe( (data) => {});

    return aumentaElUltimoId;
  }

  obtenerDatosApi(id : number|string,cantidadFechasExistentes : number)
  {
    let idDeFechaNueva = 0;
    if(id === "no")
     {
      idDeFechaNueva = this.agregarFechas(cantidadFechasExistentes);
      id = idDeFechaNueva;
     }
    this.adminService.getFechas(`https://api-administracion-9e580-default-rtdb.firebaseio.com/gastos/${id}.json`)
    .subscribe((data) => {
      this.agregarDatosApi(data.gasto,data.monto,data.descripcion,data.color,data.colorhover,data.id,data.idFecha);
    });
  }

  agregarDatosApi(gasto : any[],monto : any[],descripcion : any[],color : any[],colorhover : any[],id : number,idFecha : number)
  {
    for(let i = 0 ; i < this.gastoIngresado.length ; i++)
    {
      gasto.push(this.gastoIngresado[i]);
      monto.push(this.montoIngresado[i]);
      descripcion.push(this.descripcionIngresado[i]);
      color.push(this.colorIngresado[i]);
      colorhover.push(this.hoverIngresado[i]);
    }

    this.put =
    {
      "gasto": gasto,
      "monto": monto,
      "descripcion": descripcion,
      "color": color,
      "colorhover": colorhover,
      "id": id,
      "idFecha": idFecha
    }

    this.actualizaGastosApi(this.put,id);
  }

  actualizaGastosApi(put : Object, id: number)
  {
    this.adminService.putGastos(`https://api-administracion-9e580-default-rtdb.firebaseio.com/gastos/${id}.json`,put)
    .subscribe((data) => {
      console.log(data);
    });

    this.ref.close(put);
  }
}
