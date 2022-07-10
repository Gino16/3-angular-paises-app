import { Component } from '@angular/core';
import { Country } from '../../interfaces/pais.interface';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-por-region',
  templateUrl: './por-region.component.html',
  styles: [
  ]
})
export class PorRegionComponent {
  regiones: string[] = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];
  regionActiva: string = '';
  paises: Country[] = [];

  constructor(private paisService: PaisService) { }

  activarRegion(region: string) {
    if (region === this.regionActiva) {
      return;
    }
    this.paises = [];
    this.regionActiva = region;
    this.paisService.buscarRegion(region)
      .subscribe({
        next: (paises) => {
          this.paises = paises;
        },
        error: (err) => console.error(err)
      })
  }


}
