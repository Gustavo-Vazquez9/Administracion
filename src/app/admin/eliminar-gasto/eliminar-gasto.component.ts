import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { AdministracionService } from 'src/app/services/administracion.service';

//https://api-administracion-9e580-default-rtdb.firebaseio.com/gastos.json
//https://api-administracion-9e580-default-rtdb.firebaseio.com/fechas.json
//https://api-administracion-9e580-default-rtdb.firebaseio.com/gastos/${id}.json
//https://api-administracion-9e580-default-rtdb.firebaseio.com/fechas/${id}.json

@Component({
  selector: 'app-eliminar-gasto',
  templateUrl: './eliminar-gasto.component.html',
  styleUrls: ['./eliminar-gasto.component.css']
})
export class EliminarGastoComponent {
  formGroup!: FormGroup;
  public gastosRecibidos : string[]= [];

  public gastoARecibidos : any[]= [];
  public gastoARecibidosSeleccionado : any[]= [];

  public montoRecibidos : any[]= [];
  public montoRecibidosSeleccionado : any[]= [];

  public descripcionRecibidos : any[]= [];
  public descripcionRecibidosSeleccionado : any[]= [];

  public colorRecibidos : any[]= [];
  public colorRecibidosSeleccionado : any[]= [];

  public colorhoverRecibidos : any[]= [];
  public colorhoverRecibidosSeleccionado : any[]= [];

  public gastos : any[] = [];
  public montos : any[] = [];
  public descripciones : any[] = [];
  public colores : any[] = [];
  public hovers : any[] = [];

  public put : any;
  constructor(
    private adminService : AdministracionService,
    private formBuilder: FormBuilder,
    private ref: DynamicDialogRef
  ){}
  ngOnInit() {

    this.adminService.getFechas(`https://api-administracion-9e580-default-rtdb.firebaseio.com/gastos/${this.adminService.getId()}.json`)
    .subscribe( (data) =>
    {
      this.gastosRecibidos = data.gasto.map((value : any, index : any) => {
        return { name: value, id: (index + 1).toString() };
      });

      this.gastoARecibidos = data.gasto.map((value : any, index : any) => {
        return { name: value, id: (index + 1).toString() };
      });

      this.montoRecibidos = data.monto.map((value : any, index : any) => {
        return { name: value, id: (index + 1).toString() };
      });

      this.descripcionRecibidos = data.descripcion.map((value : any, index : any) => {
        return { name: value, id: (index + 1).toString() };
      });

      this.colorRecibidos = data.color.map((value : any, index : any) => {
        return { name: value, id: (index + 1).toString() };
      });

      this.colorhoverRecibidos = data.colorhover.map((value : any, index : any) => {
        return { name: value, id: (index + 1).toString() };
      });
    });


    this.formGroup = this.formBuilder.group(
      {
        gasto: ['', []],
      }
    );
  }

  seleccionGato()
  {
    this.gastos = this.gastoARecibidos.filter( ( elemento )=>
    {
      return elemento.id !== this.formGroup.value.gasto.id;
    });
    this.montos = this.montoRecibidos.filter( ( elemento )=>
    {
      return elemento.id !== this.formGroup.value.gasto.id;
    });
    this.descripciones = this.descripcionRecibidos.filter( ( elemento )=>
    {
      return elemento.id !== this.formGroup.value.gasto.id;
    });
    this.colores = this.colorRecibidos.filter( ( elemento )=>
    {
      return elemento.id !== this.formGroup.value.gasto.id;
    });
    this.hovers = this.colorhoverRecibidos.filter( ( elemento )=>
    {
      return elemento.id !== this.formGroup.value.gasto.id;
    });
  }

  eliminarGasto()
  {
    for (let index = 0; index < this.gastos.length; index++) {
      this.gastoARecibidosSeleccionado.push(this.gastos[index].name);
      this.montoRecibidosSeleccionado.push(this.montos[index].name);
      this.descripcionRecibidosSeleccionado.push(this.descripciones[index].name);
      this.colorRecibidosSeleccionado.push(this.colores[index].name);
      this.colorhoverRecibidosSeleccionado.push(this.hovers[index].name);
    }

    this.put =
    {
      "gasto": this.gastoARecibidosSeleccionado,
      "monto": this.montoRecibidosSeleccionado,
      "descripcion": this.descripcionRecibidosSeleccionado,
      "color": this.colorRecibidosSeleccionado,
      "colorhover": this.colorhoverRecibidosSeleccionado,
      "id": this.adminService.getId(),
      "idFecha": this.adminService.getId()
    };

    this.adminService.putGastos(`https://api-administracion-9e580-default-rtdb.firebaseio.com/gastos/${this.adminService.getId()}.json`,this.put)
    .subscribe((data) => {
    this.ref.close(this.put);
    });
  }
}
