import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { InicioPageRoutingModule } from './inicio-routing.module';
import { InicioPage } from './inicio.page';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormularioEstacionamientoComponent } from '../shared/formulario-estacionamiento/formulario-estacionamiento.component';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InicioPageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [
    InicioPage,
    FormularioEstacionamientoComponent],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class InicioPageModule {}
