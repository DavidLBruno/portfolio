import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TranslocoModule } from '@ngneat/transloco';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBriefcase, faArrowUpRightFromSquare, faCodeBranch } from '@fortawesome/free-solid-svg-icons';

interface WorkExperience {
  title: string;
  company: string;
  period: string;
  current: boolean;
  description: string;
  responsibilities: string[];
  tags: string[];
}

interface ProjectItem {
  title: string;
  description: string;
  image?: string;
  icon?: string;
  repository?: string;
  deploy?: string;
  tags: string[];
  type: string;
}

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
  imports: [CommonModule, TranslocoModule, FontAwesomeModule],
  standalone: true,
})
export class ProjectsComponent {
  faBriefcase = faBriefcase;
  faExternal = faArrowUpRightFromSquare;
  faCode = faCodeBranch;

  workExperience: WorkExperience[] = [
    {
      title: 'Desarrollador de Producto',
      company: 'InspectIA',
      period: 'Abril 2026 – Actualidad',
      current: true,
      description: 'Lidero el desarrollo integral de una plataforma de inspección vehicular para compañías de seguros.',
      responsibilities: [
        'Diseño y ejecución del flujo completo de inspección, desde la captura de datos hasta el procesamiento con IA.',
        'Arquitectura del backend y frontend asegurando una experiencia de usuario fluida y robusta.',
      ],
      tags: ['Angular', 'NestJS', 'Prisma', 'AWS', 'IA'],
    },
    {
      title: 'BackEnd Developer',
      company: 'TheLabit',
      period: 'Agosto 2023 – Actualidad',
      current: true,
      description: 'Desarrollo y migración de microservicios y aplicaciones móviles.',
      responsibilities: [
        'Migración de microservicios Java a NestJS en OpenShift RedHat.',
        'Desarrollo de apps React Native con sistemas de validación QR.',
        'Mantenimiento y desarrollo de aplicaciones web administrativas en Angular.',
      ],
      tags: ['NestJS', 'React Native', 'Angular', 'OpenShift', 'Java'],
    },
    {
      title: 'FrontEnd Developer Angular',
      company: 'Depsys Informática (IberaSoft)',
      period: 'Octubre 2022 – Agosto 2023',
      current: false,
      description: 'Modernización de sistemas ERP y diseño de reportes.',
      responsibilities: [
        'Migración de un ERP legacy en Visual Basic hacia una arquitectura moderna en Angular.',
        'Diseño y estructuración de informes técnicos con JasperSoft.',
      ],
      tags: ['Angular', 'TypeScript', 'JasperSoft', 'Visual Basic'],
    },
  ];

  projects: ProjectItem[] = [
    {
      title: 'InspectIA',
      description: 'Plataforma de inspección vehicular con IA para compañías de seguros.',
      tags: ['Angular', 'NestJS', 'Prisma', 'AWS', 'IA'],
      type: 'product',
    },
    {
      title: 'LetsGo',
      description: 'Sistema de gestión escolar con plan de modernización tecnológica.',
      tags: ['.NET Framework', 'Angular', 'NestJS'],
      type: 'venture',
    },
    {
      title: 'Portfolio',
      description: 'Aplicación web para exhibir habilidades de UI/UX.',
      image: '/assets/images/projects/portfolio.png',
      icon: '/assets/images/projects/portfolio-icon.png',
      repository: 'https://github.com/DavidLBruno/portfolio',
      tags: ['Angular', 'SSR', 'SCSS'],
      type: 'personal',
    },
    {
      title: 'Billetera Virtual',
      description: 'Aplicación financiera desarrollada en equipo.',
      image: '/assets/images/projects/wallet-digital.png',
      icon: '/assets/images/projects/wallet-digital-icon.png',
      repository: 'https://github.com/DavidLBruno/grupo-n-1',
      tags: ['Node.js', 'React', 'PostgreSQL'],
      type: 'group',
    },
    {
      title: 'E-commerce Vlixes',
      description: 'Tienda de ropa deportiva con coordinación de equipo.',
      image: '/assets/images/projects/e-commerce.png',
      icon: '/assets/images/projects/e-commerce-logo.png',
      deploy: 'https://pf-vlixes-main.vercel.app/',
      tags: ['React', 'Node.js', 'Redux'],
      type: 'group',
    },
    {
      title: 'App Pokémon',
      description: 'Desarrollo Full Stack con filtros, búsquedas y creación de datos.',
      image: '/assets/images/projects/pokemon.png',
      icon: '/assets/images/projects/game1.png',
      deploy: 'https://pi-pokemon-eta.vercel.app/',
      repository: 'https://github.com/DavidLBruno/PI-POKEMON',
      tags: ['React', 'Redux', 'Express', 'PostgreSQL'],
      type: 'personal',
    },
  ];
}
