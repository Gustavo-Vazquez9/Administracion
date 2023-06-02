import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrincipalComponent } from './principal/principal.component';
import { NominaComponent } from './nomina/nomina.component';
import { AgregarGastoComponent } from './agregar-gasto/agregar-gasto.component';
import { HistorialComponent } from './historial/historial.component';

const routes: Routes = [
  {
    path:'',
    component: NominaComponent,
  },
  {
    path:'admin',
    component: PrincipalComponent,
  },
  {
    path:'nomina',
    component: NominaComponent,
  },
    {
    path:'historial',
    component: HistorialComponent,
  },
];

@NgModule({
  imports:[RouterModule.forChild(routes)],
  exports:[RouterModule]
})
export class TarjetasRoutingModule { }
