import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { TranslocoModule } from '@jsverse/transloco';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import {
  faCode,
  faServer,
  faPaintBrush,
  faMobileScreen,
  faDatabase,
  faToolbox,
} from '@fortawesome/free-solid-svg-icons';

/** `key` points to TECHNOLOGIES.CATEGORIES.* in assets/i18n. */
interface TechCategory {
  key: string;
  icon: IconDefinition;
  items: { title: string }[];
}

@Component({
  selector: 'app-tecnologies',
  templateUrl: './tecnologies.component.html',
  styleUrls: ['./tecnologies.component.scss'],
  imports: [TranslocoModule, FontAwesomeModule],
})
export class TecnologiesComponent {
  private router = inject(Router);

  filterExperience(tech: string) {
    const eduOnlyTechs = [
      'C',
      'C++',
      'C#',
      '.NET Framework',
      'Bash',
      'Linux',
      'SQL',
      'JavaScript',
    ];
    if (eduOnlyTechs.includes(tech)) {
      this.router.navigate(['/about'], { queryParams: { tech } });
    } else {
      this.router.navigate(['/projects'], { queryParams: { tech } });
    }
  }

  tecnologies: TechCategory[] = [
    {
      key: 'TECHNOLOGIES.CATEGORIES.LANGUAGES',
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
      key: 'TECHNOLOGIES.CATEGORIES.BACKEND',
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
      key: 'TECHNOLOGIES.CATEGORIES.FRONTEND',
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
      key: 'TECHNOLOGIES.CATEGORIES.MOBILE',
      icon: faMobileScreen,
      items: [{ title: 'React Native' }, { title: 'Flutter' }],
    },
    {
      key: 'TECHNOLOGIES.CATEGORIES.DATABASES',
      icon: faDatabase,
      items: [
        { title: 'PostgreSQL' },
        { title: 'MySQL' },
        { title: 'OracleSQL' },
      ],
    },
    {
      key: 'TECHNOLOGIES.CATEGORIES.TOOLS',
      icon: faToolbox,
      items: [
        { title: 'Git' },
        { title: 'Jira' },
        { title: 'Docker' },
        { title: 'Linux' },
        { title: 'Bash' },
        { title: 'AWS' },
        { title: 'GCP' },
        { title: 'OpenShift' },
        { title: 'JasperSoft' },
        { title: 'IA' },
      ],
    },
  ];
}
