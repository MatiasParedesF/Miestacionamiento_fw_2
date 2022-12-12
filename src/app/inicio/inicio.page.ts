
import { AfterViewInit, Component } from '@angular/core';
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

    this.parkingService.obtenerEstacionamientos().subscribe(
      (estacionamientos)=>{
        this.estacionamientos=estacionamientos
      },
      (err)=>{
        console.log(err);
      })
  }

  irEstacionamiento(estacionamiento:Parking){
    google.maps.event
  }

  obtenerEstacionamientos(){


    this.parkingService.obtenerEstacionamientos().subscribe(
      (estacionamientos)=>{
        this.estacionamientos=estacionamientos;

        this.estacionamientos.forEach(parking => {
          this.marcadores.push({
            position: {
              lat: Number(parking.latitud),
              lng: Number(parking.longitud)
            },
            title: ''
          })
        });
        this.marcadores.forEach(m=>{
          console.log(m);
          this.addMarker(m);
        });

      },
      (err)=>{
        console.log(err);
      }
    );
  }


}