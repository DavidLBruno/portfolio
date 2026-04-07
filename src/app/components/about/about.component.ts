import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  imports: [CommonModule],
  standalone: true,
})
export class AboutComponent {
  estudios = [
    {
      title: 'Tecnicatura Universitaria en Inteligencia Artificial',
      subTitle: {
        title: 'Universidad Nacional de Rosario',
        link: 'https://unr.edu.ar/',
      },
      fecha: 'Febrero de 2023 - Diciembre 2026',
      descripcion: '',
    },
    {
      title: 'SkillUp Node',
      subTitle: { title: 'Alkemy', link: 'https://www.alkemy.org/' },
      fecha: '1 de noviembre de 2022 - 16 noviembre de 2022',
      descripcion: '',
    },
    {
      title: 'Bootcamp FullStack PERN',
      subTitle: { title: 'Henry', link: 'https://www.soyhenry.com/' },
      fecha: 'Diciembre 2021 - Agosto 2022',
      descripcion: '',
    },
  ];
}
