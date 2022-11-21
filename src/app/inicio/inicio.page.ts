
import { Component, OnInit } from '@angular/core';
import { CoordInfo } from '../modelos/coord.info';
import { Marker } from '../modelos/marker.model';

declare var google;

@Component({
  selector: 'app-inicio,',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

  map = null;
  marker: Marker = {
    position: {
      lat: -33.5488,
      lng: -70.762184,
    },
    title: "Sambil"
  };
  coordInfo: CoordInfo = null;

  constructor() { }

  ngOnInit() {;
    this.loadMap();
  }

  loadMap() {
    const mapEle: HTMLElement = document.getElementById('map');

    const myLatLng = {
      lat: this.marker.position.lat,
      lng: this.marker.position.lng
    };

    this.map = new google.maps.Map(mapEle, {
      center: myLatLng,
      zoom: 15
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


}