import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu/menu.component';
import { PrimeModule } from '../prime/prime.module';
import { LoaderComponent } from './loader/loader.component';



@NgModule({
  declarations: [
    MenuComponent,
    LoaderComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    PrimeModule,
  ],
  exports:[
    MenuComponent,
    PrimeModule,
    LoaderComponent
  ]
})
export class SharedModule { }
