import { Component, OnDestroy } from '@angular/core';
import { ServicesService } from '../../services/services.service';

import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AgregarGastoComponent } from '../agregar-gasto/agregar-gasto.component';
import { AdministracionService } from 'src/app/services/administracion.service';
import { DatePipe } from '@angular/common';


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
  public nominaIngresada : number = 0;
  name: string | undefined;
  public fechaHoy : any[] = [];

  ref!: DynamicDialogRef;

  constructor(
    private servicioNomina : ServicesService,
    private adminService : AdministracionService,
    public dialogService: DialogService,
    private datePipe: DatePipe
    ) {}

    ngOnInit() {
      this.nominaIngresada = this.servicioNomina.getNomina();

      // this.adminService.getFechas("http://192.168.0.3:3000/fechas")
      // .subscribe( (data) =>
      // {
      //   this.fechaHoy = data.filter( ( item : any ) =>
      //   {
      //     return item.fecha === this.datePipe.transform(this.fecha, 'MMM dd, yyyy');
      //   });

      //   if(this.fechaHoy.length != 0)
      //   {
      //     this.adminService.getGastosConstantes(`http://192.168.0.3:3000/fechas/${this.fechaHoy[0].id}/gastos`)
      //     .subscribe( (data) =>
      //     {
      //       data.forEach((element:any) => {
      //         this.plantillaGrafica(element.gasto,element.monto,element.color,element.colorhover);
      //       });
      //     });
      //   } else
      //   {
      //     this.adminService.getGastosConstantes("http://192.168.0.3:3000/constantes")
      //     .subscribe( (data) =>
      //     {
      //       data.forEach((element:any) => {
      //         this.plantillaGrafica(element.gastosConstantes,parseInt(element.montoConstantes),element.coloresConstantes,element.hoverConstantes);
      //       });
      //     });
      //   }
      // });
      }

      openDialog() {
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

          this.gastosConstantesNombre.push(etiqueta);
          this.gastosConstantesMontos.push(datos);
          this.gastosConstantesColores.push(color);
          this.gastosConstantesColoresHover.push(hover);

        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        this.data = {
          labels: this.gastosConstantesNombre,
          datasets: [
              {
                  data: this.gastosConstantesMontos,
                  backgroundColor: this.gastosConstantesColores,
                  hoverBackgroundColor: this.gastosConstantesColoresHover
              }
          ]
      };
      this.options = {
        cutout: '50%',
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
        },2000);
      }

      agregarNuevosGastos(datos : Object[])
      {
        datos.forEach( (elementos : any)=>
        {
          this.gastosConstantesNombre.push(elementos.gasto);
          this.gastosConstantesMontos.push(elementos.monto);
          this.gastosConstantesColores.push(elementos.color);
          this.gastosConstantesColoresHover.push(elementos.colorhover);
        });
        this.plantillaGrafica(this.gastosConstantesNombre,this.gastosConstantesMontos,this.gastosConstantesColores,this.gastosConstantesColoresHover);
      }

      ngOnDestroy() {
        if (this.ref) {
            this.ref.close();
        }
    }
}

