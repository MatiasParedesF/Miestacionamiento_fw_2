
import { AfterViewInit, Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CoordInfo } from '../modelos/coord.info';
import { Marker } from '../modelos/marker.model';
import { Parking } from '../modelos/parking.model';
import { ParkingService } from '../services/parking.service';

declare var google;

@Component({
  selector: 'app-inicio,',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements AfterViewInit {

  map = null;
  marker: Marker = {
    position: {
      lat: -33.5488,
      lng: -70.762184,
    },
    title: "Sambil"
  };
  geoMarker: Marker;
  estadoFormParking:boolean = false;
  geoParking: Parking;
  geoArray: any = []
  coordInfo: CoordInfo = null;
  estacionamientos: Parking[]=[];
  marcadores:Marker[]=[];


  constructor(private parkingService:ParkingService) { }
  ngAfterViewInit(): void {
    this.obtenerEstacionamientos();
    this.loadMap();
  }

  ngOnInit() {
  }

  loadMap() {
    const mapEle: HTMLElement = document.getElementById('map');

    const myLatLng = {
      lat: this.marker.position.lat,
      lng: this.marker.position.lng
    };

    this.map = new google.maps.Map(mapEle, {
      center: myLatLng,
      zoom: 15,
      disableDefaultUI: true,
    });
  
    google.maps.event.addListenerOnce(this.map, 'idle', () => {
      this.addMarker(this.marker);
      mapEle.classList.add('show-map');
    });
  }

  addMarker(marker: Marker) {
    var mapMarker = new google.maps.Marker({
      position: marker.position,
      map: this.map,
      title: marker.title
    });

  }

  crearEstacionamiento(){
    this.estadoFormParking= true
  }

  irEstacionamiento(estacionamiento:Parking){
    this.map.setCenter(new google.maps.LatLng(estacionamiento.latitud,estacionamiento.longitud));
  }

  actualizaEstacionamientos(parking){

    this.marcadores.push({
      position: {
        lat: Number(parking.latitud),
        lng: Number(parking.longitud)
      },
      title: parking.nombre ? parking.nombre : 'Sin nombre'
    })
  }

  obtenerEstacionamientos(){


    this.parkingService.obtenerEstacionamientos().subscribe(
      (estacionamientos)=>{
        this.estacionamientos=estacionamientos;

        this.estacionamientos.forEach(parking => {
          this.actualizaEstacionamientos(parking)
          this.marcadores.push({
            position: {
              lat: Number(parking.latitud),
              lng: Number(parking.longitud)
            },
            title: parking.nombre ? parking.nombre : 'Sin definir'
          })
        });
        this.marcadores.forEach(m=>{
          this.addMarker(m);
        });

      },
      (err)=>{
        console.log(err);
      }
    );
  }

  guardar(miFormulario:FormGroup){

    var geocoder = new google.maps.Geocoder();
            //var textSelectM = $("#txtCiudad").text();
            //var textSelectE = $("#txtEstado").val();
            console.log(miFormulario.get('direccion').value);
            console.log(miFormulario.get('ciudad').value);
            console.log(miFormulario.get('region').value);

            //var inputAddress = $("#txtDireccion").val() + ' ' + textSelectM + ' ' + textSelectE;
    console.log(miFormulario.value);

    geocoder.geocode({address:miFormulario.get('direccion').value}, (resultado)=>{
      const results = resultado;
      this.geoArray = resultado;
      const lat = this.geoArray[0].geometry.location.lat();
      const lng = this.geoArray[0].geometry.location.lng();

      this.geoParking={
        direccion:  miFormulario.get('direccion').value,
        ancho:       miFormulario.get('ancho').value,
        largo:       miFormulario.get('largo').value,
        alto:        miFormulario.get('alto').value,
        latitud:     lat,
        longitud:    lng,
        descripcion: miFormulario.get('descripcion').value,
        valorHora:   miFormulario.get('valorHora').value,
        nombre:        miFormulario.get('nombre').value
      }
      this.estacionamientos.push(this.geoParking);
      this.geoMarker={
        position:{lat:Number(this.geoParking.latitud),lng:Number(this.geoParking.longitud)},
        title: this.geoParking.nombre
      }
      this.addMarker(this.geoMarker);
      //this.map.
      this.irEstacionamiento(this.geoParking);
      this.map.setZoom(19);
    })
  }

  cerrar(estado:boolean){
    this.estadoFormParking=estado;
  }


}