import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Parking } from '../modelos/parking.model';

@Injectable({
  providedIn: 'root'
})
export class ParkingService {
  private _apiUrl:string="assets/mock"

  constructor(private http: HttpClient) { 
  }

  obtenerEstacionamientos(): Observable<Parking[]> {

    const url=`${this._apiUrl}/estacionamientos.mock.json`;

    return this.http.get<Parking[]>(url);
    
  }

}

