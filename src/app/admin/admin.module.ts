import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';


import { PrincipalComponent } from './principal/principal.component';
import { SharedModule } from '../shared/shared.module';
import { TarjetasRoutingModule } from './admin-routing.module';

import { AgregarGastoComponent } from './agregar-gasto/agregar-gasto.component';
import { NominaComponent } from './nomina/nomina.component';
import { ServicesService } from '../services/services.service';
import { ModificarGastoComponent } from './modificar-gasto/modificar-gasto.component';
import { EliminarGastoComponent } from './eliminar-gasto/eliminar-gasto.component';
import { HistorialComponent } from './historial/historial.component';

@NgModule({
  declarations: [
    PrincipalComponent,
    NominaComponent,
    AgregarGastoComponent,
    ModificarGastoComponent,
    EliminarGastoComponent,
    HistorialComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    TarjetasRoutingModule,
    SharedModule
  ],
  exports:[
    PrincipalComponent,
    NominaComponent
  ],
  providers: [ServicesService]
})
export class AdminModule { }
