import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TranslocoModule } from '@ngneat/transloco';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faGraduationCap, faGamepad, faChess, faMicrochip, faAppleWhole, faDumbbell } from '@fortawesome/free-solid-svg-icons';
import { faJs } from '@fortawesome/free-brands-svg-icons';

interface Education {
  title: string;
  institution: string;
  institutionLink: string;
  period: string;
  current: boolean;
  description: string;
}

interface Hobby {
  title: string;
  icon: any;
}

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  imports: [CommonModule, TranslocoModule, FontAwesomeModule],
  standalone: true,
})
export class AboutComponent {
  faGrad = faGraduationCap;

  estudios: Education[] = [
    {
      title: 'Ingeniería en Sistemas Informáticos',
      institution: 'UAI – Universidad Abierta Interamericana',
      institutionLink: 'https://uai.edu.ar/',
      period: '2024 – En curso',
      current: true,
      description: 'Formación integral en sistemas informáticos con enfoque en la ingeniería de software.',
    },
    {
      title: 'Tecnicatura Universitaria en Inteligencia Artificial',
      institution: 'Universidad Nacional de Rosario',
      institutionLink: 'https://unr.edu.ar/',
      period: 'Febrero 2023 – En curso',
      current: true,
      description: 'Estudio de fundamentos de IA, machine learning y procesamiento de datos.',
    },
    {
      title: 'Full Stack Web Developer',
      institution: 'Henry Bootcamp',
      institutionLink: 'https://www.soyhenry.com/',
      period: 'Diciembre 2021 – Agosto 2022',
      current: false,
      description: 'Programa intensivo de 700 horas cubriendo el stack PERN (PostgreSQL, Express, React, Node.js).',
    },
    {
      title: 'SkillUp Node.js',
      institution: 'Alkemy',
      institutionLink: 'https://www.alkemy.org/',
      period: 'Noviembre 2022',
      current: false,
      description: 'Programa especializado en desarrollo backend con Node.js.',
    },
  ];

  hobbies: Hobby[] = [
    { title: 'Programación Competitiva', icon: faJs },
    { title: 'Ajedrez', icon: faChess },
    { title: 'Hardware de PC', icon: faMicrochip },
    { title: 'Nutrición', icon: faAppleWhole },
    { title: 'Deportes', icon: faDumbbell },
  ];
}
