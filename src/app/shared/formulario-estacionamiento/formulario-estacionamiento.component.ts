import { Component, EventEmitter, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-formulario-estacionamiento',
  templateUrl: './formulario-estacionamiento.component.html',
  styleUrls: ['./formulario-estacionamiento.component.scss'],
})
export class FormularioEstacionamientoComponent {

  @Output() miFormularioEvent= new EventEmitter<FormGroup>();
  @Output() cierreFormularioEvent = new EventEmitter<boolean>();

  miFormulario: FormGroup = this.fb.group({
    nombre:["Estacionamiento 3",[Validators.required, Validators.minLength(3)]],
    direccion:["Las aguilas 853, Maipu",[Validators.required, Validators.minLength(1)]],
    ciudad:["Santiago",[Validators.required, Validators.minLength(1)]],
    region:["Metropolitana",[Validators.required, Validators.minLength(1)]],
    ancho:["3",[Validators.required, Validators.minLength(1)]],
    largo:["2",[Validators.required, Validators.minLength(1)]],
    alto:["3",[Validators.required, Validators.minLength(1)]],
    latitud:[],
    longitud:[],
    descripcion:["Es un valor economico",[Validators.required, Validators.minLength(1)]],
    valorHora:[7000,[Validators.required, Validators.min(0)]]
  }); 
  
  
  constructor(private fb: FormBuilder) { }

  get favoritosArr(){
    return this.miFormulario.get('favoritos') as FormArray;
  }
  campoEsValido(campo:string|number){
    return this.miFormulario.controls[campo].errors && this.miFormulario.controls[campo].touched
  }

  guardar(){

    if(this.miFormulario.invalid){
      this.miFormulario.markAllAsTouched();
      return;
    }
    this.miFormularioEvent.emit(this.miFormulario);

    this.cierreFormularioEvent.emit(false);

  }
  
  cerrar(){
    this.cierreFormularioEvent.emit(false);
  }

}
