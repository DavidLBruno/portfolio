import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslocoModule } from '@ngneat/transloco';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faBriefcase,
  faArrowUpRightFromSquare,
  faCodeBranch,
} from '@fortawesome/free-solid-svg-icons';

interface WorkExperience {
  title: string;
  company: string;
  period: string;
  current: boolean;
  description: string;
  responsibilities: string[];
  tags: string[];
  subProjects?: SubProject[];
}

interface SubProject {
  title: string;
  description: string;
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
export class ProjectsComponent implements OnInit {
  faBriefcase = faBriefcase;
  faExternal = faArrowUpRightFromSquare;
  faCode = faCodeBranch;

  selectedTech: string | null = null;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.selectedTech = params['tech'] || null;
      if (this.selectedTech && typeof window !== 'undefined') {
        const doc = document.getElementById('experience-section');
        if (doc) doc.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  hasTechJob(job: any): boolean {
    if (!this.selectedTech) return true;
    const lowerTech = this.selectedTech.toLowerCase();
    const hasInTags = job.tags.some((t: string) => t.toLowerCase() === lowerTech);
    const hasInSub = job.subProjects
      ? job.subProjects.some((s: any) =>
          s.tags.some((t: string) => t.toLowerCase() === lowerTech)
        )
      : false;
    return hasInTags || hasInSub;
  }

  hasTechProject(project: any): boolean {
    if (!this.selectedTech) return true;
    return project.tags.some(
      (t: string) => t.toLowerCase() === this.selectedTech?.toLowerCase()
    );
  }

  clearFilter() {
    this.router.navigate(['/projects']);
  }

  workExperience: WorkExperience[] = [
    {
      title: 'Full Stack Developer',
      company: 'TheLabit',
      period: 'Agosto 2023 – Actualidad',
      current: true,
      description:
        'Desarrollo y mantenimiento continuo de productos digitales complejos, aplicaciones móviles nativas y ecosistemas de microservicios para múltiples clientes institucionales.',
      responsibilities: [
        'Liderazgo arquitectónico y migración de microservicios Java a NestJS en infraestructuras Cloud (OpenShift RedHat / AWS).',
        'Desarrollo integral de aplicaciones React Native y Angular abarcando captura de datos, lectura de QR y gestión de identidades digitales.',
      ],
      tags: ['Angular', 'React Native', 'NestJS', 'Python', 'AWS', 'MySQL', 'Git', 'OracleSQL', 'HTML5', 'CSS3', 'Jira'],
      subProjects: [
        {
          title: 'InspectIA',
          description: 'Plataforma B2B para compañías de seguros que automatiza la inspección de vehículos usando inteligencia artificial.',
          tags: ['Angular', 'NestJS', 'Prisma', 'FastAPI', 'Python', 'Docker', 'AWS', 'IA']
        },
        {
          title: 'Credential Wallet',
          description: 'Billetera digital de credenciales con sistema validación QR, diseñada para multi-empresa institucional.',
          tags: ['React Native', 'NestJS', 'MySQL']
        },
        {
          title: 'App Sindical (ATSA)',
          description: 'Aplicación integral para afiliados. Permite gestión de permisos familiares, inscripción a sorteos/eventos e incluye feed de noticias en tiempo real del gremio.',
          tags: ['React Native', 'Angular', 'NestJS', 'TypeORM', 'MySQL']
        }
      ]
    },
    {
      title: 'FrontEnd Developer Angular',
      company: 'Depsys Informática (IberaSoft)',
      period: 'Octubre 2022 – Agosto 2023',
      current: false,
      description:
        'Modernización de sistemas ERP, desarrollo de aplicaciones para terceros y diseño de reportes.',
      responsibilities: [
        'Migración de un ERP legacy en Visual Basic hacia una arquitectura moderna en Angular.',
        'Diseño y desarrollo de páginas web del tipo SPA (Single Page Applications) para clientes de terceros.',
        'Diseño y estructuración de informes técnicos con JasperSoft.',
      ],
      tags: ['Angular', 'TypeScript', 'JasperSoft', 'Visual Basic', 'HTML5', 'CSS3'],
    },
  ];

  projects: ProjectItem[] = [
    /* 
    {
      title: 'LetsGo',
      description: 'Sistema de gestión escolar con plan de modernización tecnológica.',
      tags: ['.NET Framework', 'Angular', 'NestJS'],
      type: 'venture',
    },
    */
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
      description:
        'Desarrollo Full Stack con filtros, búsquedas y creación de datos.',
      image: '/assets/images/projects/pokemon.png',
      icon: '/assets/images/projects/game1.png',
      deploy: 'https://pi-pokemon-eta.vercel.app/',
      repository: 'https://github.com/DavidLBruno/PI-POKEMON',
      tags: ['React', 'Redux', 'Express', 'PostgreSQL', 'Sequelize'],
      type: 'personal',
    },
  ];
}
