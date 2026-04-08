import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslocoModule } from '@ngneat/transloco';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCode, faServer, faPaintBrush, faMobileScreen, faDatabase, faToolbox } from '@fortawesome/free-solid-svg-icons';

interface TechCategory {
  title: string;
  icon: any;
  items: { title: string }[];
}

@Component({
  selector: 'app-tecnologies',
  templateUrl: './tecnologies.component.html',
  styleUrls: ['./tecnologies.component.scss'],
  imports: [CommonModule, TranslocoModule, FontAwesomeModule],
  standalone: true,
})
export class TecnologiesComponent {
  constructor(private router: Router) {}

  filterExperience(tech: string) {
    const eduOnlyTechs = ['C', 'C++', 'C#', '.NET Framework', 'Bash', 'Linux', 'SQL', 'JavaScript'];
    if (eduOnlyTechs.includes(tech)) {
      this.router.navigate(['/about'], { queryParams: { tech } });
    } else {
      this.router.navigate(['/projects'], { queryParams: { tech } });
    }
  }

  tecnologies: TechCategory[] = [
    {
      title: 'Lenguajes',
      icon: faCode,
      items: [
        { title: 'JavaScript' },
        { title: 'TypeScript' },
        { title: 'Python' },
        { title: 'C' },
        { title: 'C++' },
        { title: 'C#' },
        { title: 'Visual Basic' },
        { title: 'SQL' },
      ],
    },
    {
      title: 'Backend',
      icon: faServer,
      items: [
        { title: 'Node.js' },
        { title: 'NestJS' },
        { title: 'Express' },
        { title: 'FastAPI' },
        { title: 'TypeORM' },
        { title: 'Prisma' },
        { title: 'Sequelize' },
        { title: '.NET Framework' },
      ],
    },
    {
      title: 'Frontend',
      icon: faPaintBrush,
      items: [
        { title: 'Angular' },
        { title: 'React' },
        { title: 'Redux' },
        { title: 'HTML5' },
        { title: 'CSS3' },
        { title: 'SSR' },
        { title: 'SCSS' },
      ],
    },
    {
      title: 'Mobile',
      icon: faMobileScreen,
      items: [
        { title: 'React Native' },
      ],
    },
    {
      title: 'Bases de Datos',
      icon: faDatabase,
      items: [
        { title: 'PostgreSQL' },
        { title: 'MySQL' },
        { title: 'OracleSQL' },
      ],
    },
    {
      title: 'Herramientas & Infra',
      icon: faToolbox,
      items: [
        { title: 'Git' },
        { title: 'Jira' },
        { title: 'Docker' },
        { title: 'Linux' },
        { title: 'Bash' },
        { title: 'AWS' },
        { title: 'OpenShift' },
        { title: 'JasperSoft' },
        { title: 'IA' },
      ],
    },
  ];
}
