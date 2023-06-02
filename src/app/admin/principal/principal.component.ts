import { Component, OnDestroy } from '@angular/core';
import { ServicesService } from '../../services/services.service';

import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AgregarGastoComponent } from '../agregar-gasto/agregar-gasto.component';
import { AdministracionService } from 'src/app/services/administracion.service';
import { DatePipe } from '@angular/common';
import { ModificarGastoComponent } from '../modificar-gasto/modificar-gasto.component';
import { EliminarGastoComponent } from '../eliminar-gasto/eliminar-gasto.component';


@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css'],
  providers: [DialogService, DatePipe]
})
export class PrincipalComponent {

  public loading = false;
  public data: any;
  public animacion : any = {};
  public montos : number[] = [];
  public fecha : Date = new Date();
  public datosAgregados : Object[] = [];
  public gastosConstantesNombre : any[] = [];
  public gastosConstantesMontos : any[] = [];
  public gastosConstantesColores : any[] = [];
  public gastosConstantesColoresHover : any[] = [];
  public options: any;
  public total: any = "";
  public restante: any = "";
  public nominaIngresada : number = 0;
  name: string | undefined;
  public fechaHoy : string | number = "sinFecha";
  public postFechas : any;
  public postGasto : any;

  ref!: DynamicDialogRef;

  constructor(
    private servicioNomina : ServicesService,
    private adminService : AdministracionService,
    public dialogService: DialogService,
    private datePipe: DatePipe
    ) {}

    ngOnInit() {
      this.nominaIngresada = this.servicioNomina.getNomina();
      this.identificaFechaHoy();
      }

      openAgregar() {
        this.ref = this.dialogService.open(AgregarGastoComponent, {
            header: 'Agregar Gasto',
            width: '70%',
            contentStyle: { overflow: 'auto' },
            baseZIndex: 10000,
            maximizable: true
        });

        this.loading = true;
        setTimeout(() => {
          this.loading=false;
          this.ref.onClose.subscribe( (elementosDeAgregarGastoComponente) => {
            this.datosAgregados = elementosDeAgregarGastoComponente;
            this.agregarNuevosGastos(this.datosAgregados);
        });
        }, 2000);
      }

      plantillaGrafica(etiqueta : string[]|string,datos : number[]|number,color : string[]|string,hover : string[]|string) {

        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        this.data = {
          labels: etiqueta,
          datasets: [
              {
                  data: datos,
                  backgroundColor: color,
                  hoverBackgroundColor: hover
              }
          ]
      };
      this.options = {
        cutout: '0%',
        plugins: {
            legend: {
                labels: {
                    color: textColor
                }
            }
        },
        animation:{
        duration:2000,
        easing: 'easeInOutQuad'
          }
      };

      this.totalGrafica();
      }

      totalGrafica()
      {
        setTimeout(()=>
        {
          this.montos = this.data.datasets[0].data;
          if(this.montos.length === 0)
          {
            this.total = this.servicioNomina.getNomina();
          } else {
            this.total = this.montos.reduce((acumulador,valorActual)=>{
              return acumulador+valorActual
            },0);
          }

          this.restante = this.nominaIngresada - this.total;
        },2000);
      }

      agregarNuevosGastos(datos : any)
      {
        this.plantillaGrafica(datos.gasto,datos.monto,datos.color,datos.colorhover);
      }

      identificaFechaHoy()
      {
        this.adminService.getFechas("https://api-administracion-9e580-default-rtdb.firebaseio.com/fechas.json")
        .subscribe( (data) =>
        {
          data.forEach((item : any) => {
            if(item.fecha === this.datePipe.transform(this.fecha, 'MMM dd, yyyy'))
            {
              this.fechaHoy = item.id;
              this.adminService.setId(this.fechaHoy);
              this.obtenerYPintarGrafica(this.fechaHoy);
            }
          });
          //condicion para crear nueva fecha y nuevo gasto predefinido a la fecha nueva
          if(this.fechaHoy === "sinFecha")
          {
            this.crearNuevaFecha(data.length);
            this.crearNuevoGastoEnNuevaFecha(data.length);
          }
        });
      }

      obtenerYPintarGrafica(id : any)
      {
        this.adminService.getFechas(`https://api-administracion-9e580-default-rtdb.firebaseio.com/gastos/${id}.json`)
        .subscribe( (data) =>
        {
          this.plantillaGrafica(data.gasto,data.monto,data.color,data.colorhover);
        });
      }

      crearNuevaFecha(cantidadDeElementos : number)
      {
        let aumentaElUltimoId = cantidadDeElementos+1;
        this.adminService.setId(aumentaElUltimoId);
        this.postFechas = {
          "id": aumentaElUltimoId,
          "fecha": this.datePipe.transform(this.fecha, 'MMM dd, yyyy')
        }
        this.adminService.postFechas("https://api-administracion-9e580-default-rtdb.firebaseio.com/fechas.json", this.postFechas)
        .subscribe( (data) => {});
      }

      crearNuevoGastoEnNuevaFecha(cantidadDeElementos : number)
      {
        const gasto : any[]= ["Gasto","Renta","Diezmo","Pasajes"];
        const monto : any[]= [2000,1350,800,400];
        const descripcion : any[]= ["","","",""];
        const color : any[]= ["#A071F7","#6E6B70","#77F2A8","#F5CA5D"];
        const colorhover : any[]= ["#894EF7","#535255","#4EF38F","#F7C035"];
        let aumentaElUltimoId = cantidadDeElementos+1;
        this.postGasto =
        {
          "gasto": gasto,
          "monto": monto,
          "descripcion": descripcion,
          "color": color,
          "colorhover": colorhover,
          "id": aumentaElUltimoId,
          "idFecha": aumentaElUltimoId
        }

        this.adminService.postGastos("https://api-administracion-9e580-default-rtdb.firebaseio.com/gastos.json", this.postGasto)
        .subscribe( (data) => {
          this.plantillaGrafica(data.gasto,data.monto,data.color,data.colorhover);
        });

      }


      ////////////
      //Modificar
      ///////////7
      openModificar() {
        this.ref = this.dialogService.open(ModificarGastoComponent, {
            header: 'Modificar Gasto',
            width: '50%',
            contentStyle: { overflow: 'auto' },
            baseZIndex: 10000,
            maximizable: true
        });

        this.loading = true;
        setTimeout(() => {
          this.loading=false;
          this.ref.onClose.subscribe( (elementosActualizados) => {
            this.datosAgregados = elementosActualizados;
            this.agregarNuevosGastos(this.datosAgregados);
        });
        }, 2000);
      }



      //////////////
      //Eliminar
      //////////////

      openEliminar() {
        this.ref = this.dialogService.open(EliminarGastoComponent, {
            header: 'Eliminar Gasto',
            width: '50%',
            contentStyle: { overflow: 'auto' },
            baseZIndex: 10000,
            maximizable: true
        });

        this.loading = true;
        setTimeout(() => {
          this.loading=false;
          this.ref.onClose.subscribe( (elementosActualizados) => {
            this.datosAgregados = elementosActualizados;
            this.agregarNuevosGastos(this.datosAgregados);
        });
        }, 2000);
      }


      ngOnDestroy() {
        if (this.ref) {
            this.ref.close();
        }
    }
}

