import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { AdministracionService } from 'src/app/services/administracion.service';

@Component({
  selector: 'app-agregar-gasto',
  templateUrl: './agregar-gasto.component.html',
  styleUrls: ['./agregar-gasto.component.css']
})
export class AgregarGastoComponent {
  public loading = false;
  public gastos : Object[] = [];
  formGroup!: FormGroup;
  public post:any;
  public fecha : Date = new Date();
  public id : number = 0;

  constructor(
    private formBuilder: FormBuilder,
    private ref: DynamicDialogRef,
    private adminService : AdministracionService
  ){}

  ngOnInit(
  ) {

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

  agregarGasto()
  {
    if(this.formGroup.status != "INVALID")
    {
      this.gastos.push(this.formGroup.value);
      this.limpiar();
    }
  }

  limpiar() {

    this.formGroup.reset();
  }

  guardarGasto()
  {
    this.loading = true;
    this.post = this.gastos.map((item:any) => {
      this.id=this.id+1;
      item.id=this.id;
      item.fecha = this.fecha;
      return item
    });
    console.log("-",this.post);
    this.post.forEach((element : any) => {
      this.adminService.postGastos("http://192.168.0.3:3000/gastos", element)
      .subscribe( (data) =>
      {
        this.loading=false;
      });
    });

    this.ref.close(this.post);
  }
}
