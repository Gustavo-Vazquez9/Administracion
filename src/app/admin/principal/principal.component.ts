import { Component, OnDestroy } from '@angular/core';
import { ServicesService } from '../../services/services.service';

import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AgregarGastoComponent } from '../agregar-gasto/agregar-gasto.component';
import { AdministracionService } from 'src/app/services/administracion.service';


@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css'],
  providers: [DialogService]
})
export class PrincipalComponent {

  public loading = false;
  public data: any;
  public animacion : any = {};
  public montos : number[] = [];
  public fecha : Date = new Date();
  public datosAgregados : Object[] = [];
  public gastosConstantesNombre : string[] = [];
  public gastosConstantesMontos : number[] = [];
  public gastosConstantesColores : string[] = [];
  public gastosConstantesColoresHover : string[] = [];
  public options: any;
  public total: any = "";
  public nominaIngresada : number = 0;
  name: string | undefined;

  ref!: DynamicDialogRef;

  constructor(
    private servicioNomina : ServicesService,
    private adminService : AdministracionService,
    public dialogService: DialogService
    ) {}

    ngOnInit() {
      this.nominaIngresada = this.servicioNomina.getNomina();
      this.adminService.getGastosConstantes("http://192.168.0.3:3000/constantes")
      .subscribe( (data) =>
      {
        this.plantillaGrafica(data[0].gastosConstantes,data[0].montoConstantes,data[0].coloresConstantes,data[0].hoverConstantes);
      });

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

      plantillaGrafica(etiqueta : string[],datos : number[],color : string[],hover : string[]) {

        this.gastosConstantesNombre=etiqueta;
        this.gastosConstantesMontos=datos;
        this.gastosConstantesColores=color;
        this.gastosConstantesColoresHover=hover;

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
        });

      }


      ngOnDestroy() {
        if (this.ref) {
            this.ref.close();
        }
    }
}

