import { Component } from '@angular/core';

import { Country } from '../../interfaces/pais.interface';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-por-pais',
  templateUrl: './por-pais.component.html',
  styles: [
    `
    li {
      cursor: pointer;
    }
    `
  ]
})
export class PorPaisComponent {

  termino: string = '';
  hayError: boolean = false;
  paises: Country[] = [];
  paisesSugeridos: Country[] = [];
  mostrarSugerencia: boolean = false;

  constructor(private paisService: PaisService) {}

  buscar(termino: string) {
    this.hayError = false;
    this.mostrarSugerencia = false;
    this.termino = termino;
    this.paisService.buscarPais(termino).subscribe(
      {
        next: paises => {
          this.paises = paises;
        },
        error: err => {
          this.hayError = true;
          console.error(err);
          this.paises = [];
        }
      }
    );
  }

  sugerencias(termino: string) {
    this.hayError = false;
    this.termino = termino;
    this.mostrarSugerencia = true;
    if (termino != '') {
      this.paisService.buscarPais(termino)
        .subscribe({
          next: paises => this.paisesSugeridos = paises.splice(0, 5),
          error: err => this.paisesSugeridos = []
        });
    }
  }
}
