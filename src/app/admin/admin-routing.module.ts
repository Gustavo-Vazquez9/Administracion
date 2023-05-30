import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrincipalComponent } from './principal/principal.component';
import { NominaComponent } from './nomina/nomina.component';
import { AgregarGastoComponent } from './agregar-gasto/agregar-gasto.component';

const routes: Routes = [
  {
    path:'',
    component: PrincipalComponent,
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
    path:'agregarGasto',
    component: AgregarGastoComponent,
  },
];

@NgModule({
  imports:[RouterModule.forChild(routes)],
  exports:[RouterModule]
})
export class TarjetasRoutingModule { }
