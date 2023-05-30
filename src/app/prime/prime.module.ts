import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { ButtonModule } from 'primeng/button';
import { ChartModule } from 'primeng/chart';
import { MenuModule } from 'primeng/menu';
import { MenubarModule } from 'primeng/menubar';
import { InputNumberModule } from 'primeng/inputnumber';
import { TableModule } from 'primeng/table';
import { ColorPickerModule } from 'primeng/colorpicker';

import { DynamicDialogModule } from 'primeng/dynamicdialog';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ButtonModule,
    ChartModule,
    MenuModule,
    MenubarModule,
    InputNumberModule,
    TableModule,
    DynamicDialogModule,
    ColorPickerModule
  ],
  exports:[
    ButtonModule,
    ChartModule,
    MenuModule,
    MenubarModule,
    InputNumberModule,
    TableModule,
    DynamicDialogModule,
    ColorPickerModule
  ]
})
export class PrimeModule { }
