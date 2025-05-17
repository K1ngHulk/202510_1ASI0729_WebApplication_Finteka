import { Component } from '@angular/core';
import {SessionService} from "../services/session.service";
import {FormsModule} from "@angular/forms";
import {NgForOf, NgIf} from "@angular/common";
@Component({
  selector: 'app-buscar',
  standalone: true,
  templateUrl: './buscar.component.html',
  imports: [
    FormsModule,
    NgIf,
    NgForOf,
  ],
  styleUrls: ['./buscar.component.css']
})
export class BuscarComponent {

  id: number = 0;
  name: string = '';
  nombre: string = '';
  profesionals: any[] = [];

  filtros = {
    experiencia: false,
    horas: false
  };

  mensaje: string = '';


  constructor(private personaService: SessionService) {}

  buscarProfesionalesPorNombre(nombre: string) {
    if (!nombre.trim()) {
      this.mensaje = 'Debes ingresar un nombre.';
      this.profesionals = [];
      return;
    }

    this.personaService.getProfessionalsByName(nombre).subscribe(
        (data) => {
          if (Array.isArray(data) && data.length > 0) {
            this.profesionals = data;
            this.mensaje = '';
          } else {
            this.profesionals = [];
            this.mensaje = 'No se encontraron profesionales.';
          }
        },
        (error) => {
          this.profesionals = [];
          this.mensaje = 'Error al buscar profesionales.';
          console.error(error);
        }
    );
  }
}
