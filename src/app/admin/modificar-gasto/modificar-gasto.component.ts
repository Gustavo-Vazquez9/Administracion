import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { AdministracionService } from 'src/app/services/administracion.service';

@Component({
  selector: 'app-modificar-gasto',
  templateUrl: './modificar-gasto.component.html',
  styleUrls: ['./modificar-gasto.component.css']
})
export class ModificarGastoComponent {
  formGroup!: FormGroup;
  public gastos : Object[] = [];
  public gastosRecibidos : string[]= [];

  public gastoARecibidos : any[]= [];
  public gastoARecibidosSeleccionado : any[]= [];
  public gastoAModel : string = "";

  public montoRecibidos : any[]= [];
  public montoRecibidosSeleccionado : any[]= [];
  public montoModel : string = "";

  public descripcionRecibidos : any[]= [];
  public descripcionRecibidosSeleccionado : any[]= [];
  public descripcionModel : string = "";

  public colorRecibidos : any[]= [];
  public colorRecibidosSeleccionado : any[]= [];
  public colorModel : string = '#6466f1';

  public colorhoverRecibidos : any[]= [];
  public colorhoverRecibidosSeleccionado : any[]= [];
  public colorhoverModel : string = "";

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
        gastoA: ['', []],
        monto: ['', []],
        color: ['', []],
        colorhover: ['', []],
        descripcion: ['', []]
      }
    );


  }


  seleccionGato()
  {
    this.gastoARecibidosSeleccionado = this.gastoARecibidos.filter( (item : any) =>
    {
      return item.id == this.formGroup.value.gasto.id;
    });
    this.gastoAModel = this.gastoARecibidosSeleccionado[0].name;
    this.formGroup?.get('gastoA')?.setValue(this.gastoAModel);


    this.montoRecibidosSeleccionado = this.montoRecibidos.filter( (item : any) =>
    {
      return item.id == this.formGroup.value.gasto.id;
    });
    this.montoModel = this.montoRecibidosSeleccionado[0].name;
    this.formGroup?.get('monto')?.setValue(this.montoModel);


    this.descripcionRecibidosSeleccionado = this.descripcionRecibidos.filter( (item : any) =>
    {
      return item.id == this.formGroup.value.gasto.id;
    });
    if(this.descripcionRecibidosSeleccionado.length !== 0)
    {
      this.descripcionModel = this.descripcionRecibidosSeleccionado[0].name;
      this.formGroup?.get('descripcion')?.setValue(this.descripcionModel);
    }


    this.colorRecibidosSeleccionado = this.colorRecibidos.filter( (item : any) =>
    {
      return item.id == this.formGroup.value.gasto.id;
    });
    this.colorModel = this.colorRecibidosSeleccionado[0].name;
    this.formGroup?.get('color')?.setValue(this.colorModel);



    this.colorhoverRecibidosSeleccionado = this.colorhoverRecibidos.filter( (item : any) =>
    {
      return item.id == this.formGroup.value.gasto.id;
    });
    this.colorhoverModel = this.colorhoverRecibidosSeleccionado[0].name;
    this.formGroup?.get('colorhover')?.setValue(this.colorhoverModel);
  }

  actualizarGasto()
  {
    let gastoAActualizar : any[] = [];
    let montoAActualizar : any[] = [];
    let descripcionAActualizar : any[] = [];
    let colorAActualizar : any[] = [];
    let colorhoverAActualizar : any[] = [];


    this.gastoARecibidos[this.formGroup.value.gasto.id - 1] =
    {
      name:this.formGroup.value.gastoA,
      id:(this.formGroup.value.gasto.id).toString()
    };

    this.montoRecibidos[this.formGroup.value.gasto.id - 1] =
    {
      name:parseInt(this.formGroup.value.monto),
      id:(this.formGroup.value.gasto.id).toString()
    };

    this.colorRecibidos[this.formGroup.value.gasto.id - 1] =
    {
      name:this.formGroup.value.color,
      id:(this.formGroup.value.gasto.id).toString()
    };

    this.colorhoverRecibidos[this.formGroup.value.gasto.id - 1] =
    {
      name:this.formGroup.value.colorhover,
      id:(this.formGroup.value.gasto.id).toString()
    };

    this.descripcionRecibidos[this.formGroup.value.gasto.id - 1] =
    {
      name:this.formGroup.value.descripcion,
      id:(this.formGroup.value.gasto.id).toString()
    };

    for (let index = 0; index < this.gastoARecibidos.length; index++) {
      gastoAActualizar.push(this.gastoARecibidos[index].name);
      montoAActualizar.push(this.montoRecibidos[index].name);
      descripcionAActualizar.push(this.descripcionRecibidos[index].name);
      colorAActualizar.push(this.colorRecibidos[index].name);
      colorhoverAActualizar.push(this.colorhoverRecibidos[index].name);
    }
    this.put =
    {
      "gasto": gastoAActualizar,
      "monto": montoAActualizar,
      "descripcion": descripcionAActualizar,
      "color": colorAActualizar,
      "colorhover": colorhoverAActualizar,
      "id": this.adminService.getId(),
      "idFecha": this.adminService.getId()
    };

    this.adminService.putGastos(`https://api-administracion-9e580-default-rtdb.firebaseio.com/gastos/${this.adminService.getId()}.json`,this.put)
    .subscribe((data) => {
    this.ref.close(this.put);
    });


  }
}
