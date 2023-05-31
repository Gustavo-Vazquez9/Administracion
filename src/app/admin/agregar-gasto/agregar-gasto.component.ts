import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { AdministracionService } from 'src/app/services/administracion.service';

@Component({
  selector: 'app-agregar-gasto',
  templateUrl: './agregar-gasto.component.html',
  styleUrls: ['./agregar-gasto.component.css'],
  providers:[DatePipe]
})
export class AgregarGastoComponent {
  //
  public gastoIngresado : string[] = [];
  public montoIngresado : number[] = []
  public colorIngresado : string[] = [];
  public hoverIngresado : string[] = [];

  public gastoPeticion : any[] = [];
  public montoPeticion : any[] = []
  public colorPeticion : any[] = [];
  public hoverPeticion : any[] = [];
  //
  public loading = false;
  public gastos : Object[] = [];
  formGroup!: FormGroup;
  public post:any;
  public postFechas:any;
  public fecha : Date = new Date();
  public opcionesFecha = { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' };
  public fechaHoy : any;
  public id : number = 0;
  public idFechas : number = 0;

  //listo
  constructor(
    private formBuilder: FormBuilder,
    private ref: DynamicDialogRef,
    private adminService : AdministracionService,
    private datePipe: DatePipe
  ){}

  ngOnInit() {

    this.adminService.getGastos("http://192.168.0.3:3000/gastos")
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
    let tamano = this.validarFecha();

    if(tamano === 0)
    {
      this.agregarFechas();
    }

    this.obtenerGastosExistentes();











    this.post = this.gastos.map((item:any) => {
      this.id=this.id+1;
      item.id=this.id;
      item.idFecha = this.idFechas;
      return item
    });
    this.post.forEach((element : any) => {
      this.adminService.postGastos("http://192.168.0.3:3000/gastos", element)
      .subscribe( (data) =>
      {
        this.loading=false;
      });
    });

    this.ref.close(this.post);
  }

  //listo
  validarFecha() {
    this.adminService.getFechas("http://192.168.0.3:3000/fechas")
    .subscribe( (data) =>
    {
      this.fechaHoy = data.filter( ( item : any ) =>
      {
        return item.fecha === this.datePipe.transform(this.fecha, 'MMM dd, yyyy');
      });
      this.idFechas = data.length;
    });

    return this.fechaHoy.length;
  }

  //listo
  agregarFechas()
  {
    this.idFechas=this.idFechas+1;
    this.postFechas = {
      "id": this.idFechas,
      "fecha": this.datePipe.transform(this.fecha, 'MMM dd, yyyy')
    }

    this.adminService.postFechas("http://192.168.0.3:3000/fechas", this.postFechas)
    .subscribe( (data) => {});
  }

  obtenerGastosExistentes()
  {
    this.adminService.getGastos("http://192.168.0.3:3000/gastos")
    .subscribe( (data) =>
    {
      this.gastoPeticion = data[0].gasto;
      this.montoPeticion = data[0].monto;
      this.colorPeticion = data[0].color;
      this.hoverPeticion = data[0].colorhover;

      for(let i = 0; i < this.gastoIngresado.length; i++)
      {
        this.gastoPeticion.push(this.gastoIngresado[i]);
        this.montoPeticion.push(this.montoIngresado[i]);
        this.colorPeticion.push(this.colorIngresado[i]);
        this.hoverPeticion.push(this.hoverIngresado[i]);
      }


    });


  }
}
