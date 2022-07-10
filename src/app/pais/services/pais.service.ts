import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Country } from '../interfaces/pais.interface';

@Injectable({
  providedIn: 'root'
})
export class PaisService {

  private apiUrl: string = 'https://restcountries.com/v3.1';
  get httpParams () {
    return new HttpParams().set('fields', 'name,capital,flags,population,cca2');
  }

  constructor(private http: HttpClient) {}

  buscarPais(termino: string): Observable<Country[]> {
    return this.http.get<Country[]>(`${this.apiUrl}/name/${termino}`, { params: this.httpParams });
  }

  buscarCapital(termino: string): Observable<Country[]> {
    return this.http.get<Country[]>(`${this.apiUrl}/capital/${termino}`, { params: this.httpParams })
  }

  getPaisPorAlpha(id: string): Observable<Country[]> {
    return this.http.get<Country[]>(`${this.apiUrl}/alpha/${id}`);
  }

  buscarRegion(region: string) {
    return this.http.get<Country[]>(`${this.apiUrl}/region/${region}`, { params: this.httpParams });
  }

}
