import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { AdministracionService } from 'src/app/services/administracion.service';
import { ServicesService } from 'src/app/services/services.service';

//https://api-administracion-9e580-default-rtdb.firebaseio.com/gastos.json
//https://api-administracion-9e580-default-rtdb.firebaseio.com/fechas.json
//https://api-administracion-9e580-default-rtdb.firebaseio.com/gastos/${id}.json
//https://api-administracion-9e580-default-rtdb.firebaseio.com/fechas/${id}.json

@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.css'],
  providers: [DatePipe]
})
export class HistorialComponent {

  public loading = false;

  public data: any;
  public options: any;
  public animacion : any = {};

  public montos : number[] = [];
  public fecha : string = "";
  public total: any = "";
  public historial : any[] = [];
  public fechas : any[] = [];
  public totales : any[] = [];

  constructor(
    private servicioNomina : ServicesService,
    private adminService : AdministracionService,
    private datePipe: DatePipe
    ) {}

    ngOnInit() {
      this.adminService.getGastos("https://api-administracion-9e580-default-rtdb.firebaseio.com/gastos.json")
      .subscribe( (data) =>
      {
        data.forEach((element:any) => {
          this.plantillaGrafica(element.gasto,element.monto,element.color,element.colorhover);
          this.encontrarFecha(element.idFecha);
        });
      });
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
      this.historial.push(this.data);
      this.totalGrafica();
      }

      totalGrafica()
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
          this.totales.push(this.total);
      }

      encontrarFecha(id:number)
      {
        this.adminService.getFechas(`https://api-administracion-9e580-default-rtdb.firebaseio.com/fechas/${id}.json`)
        .subscribe( (data) =>
        {
          this.fechas.push(data.fecha);
        });
      }
}
