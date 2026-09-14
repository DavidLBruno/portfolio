import { Component, DestroyRef, OnInit, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslocoModule } from '@jsverse/transloco';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faBriefcase,
  faArrowUpRightFromSquare,
  faCodeBranch,
} from '@fortawesome/free-solid-svg-icons';

/**
 * Text fields hold translation keys (see assets/i18n/*.json); the templates
 * resolve them with the transloco pipe so the content follows the active language.
 */
interface WorkExperience {
  key: string;
  responsibilities: number;
  current: boolean;
  tags: string[];
  subProjects?: SubProject[];
}

interface SubProject {
  key: string;
  tags: string[];
}

interface ProjectItem {
  key: string;
  image?: string;
  icon?: string;
  repository?: string;
  deploy?: string;
  tags: string[];
  type: 'personal' | 'group' | 'venture';
}

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
  imports: [TranslocoModule, FontAwesomeModule],
})
export class ProjectsComponent implements OnInit {
  faBriefcase = faBriefcase;
  faExternal = faArrowUpRightFromSquare;
  faCode = faCodeBranch;

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private destroyRef = inject(DestroyRef);

  selectedTech = signal<string | null>(null);
  workExperience = signal<WorkExperience[]>([]);
  projects = signal<ProjectItem[]>([]);

  ngOnInit() {
    this.route.queryParams
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(params => {
        const tech = params['tech'] || null;
        this.selectedTech.set(tech);

        if (tech) {
          // Matching items first, original order otherwise
          this.workExperience.set(
            [...WORK_EXPERIENCE].sort(
              (a, b) => Number(this.hasTechJob(b)) - Number(this.hasTechJob(a)),
            ),
          );
          this.projects.set(
            [...PROJECTS].sort(
              (a, b) =>
                Number(this.hasTechProject(b)) - Number(this.hasTechProject(a)),
            ),
          );
          if (typeof window !== 'undefined') {
            document
              .getElementById('experience-section')
              ?.scrollIntoView({ behavior: 'smooth' });
          }
        } else {
          this.workExperience.set([...WORK_EXPERIENCE]);
          this.projects.set([...PROJECTS]);
        }
      });
  }

  /** Keys of the numbered responsibilities of a job, e.g. `...RESPONSIBILITIES.1` */
  responsibilityKeys(job: WorkExperience): string[] {
    return Array.from(
      { length: job.responsibilities },
      (_, i) => `${job.key}.RESPONSIBILITIES.${i + 1}`,
    );
  }

  isMatch(tag: string): boolean {
    const tech = this.selectedTech();
    return !!tech && tag.toLowerCase() === tech.toLowerCase();
  }

  hasTechJob(job: WorkExperience): boolean {
    if (!this.selectedTech()) return true;
    return (
      job.tags.some(t => this.isMatch(t)) ||
      (job.subProjects ?? []).some(s => s.tags.some(t => this.isMatch(t)))
    );
  }

  hasTechProject(project: ProjectItem): boolean {
    if (!this.selectedTech()) return true;
    return project.tags.some(t => this.isMatch(t));
  }

  clearFilter() {
    this.router.navigate(['/projects']);
  }
}

const WORK_EXPERIENCE: WorkExperience[] = [
  {
    key: 'EXPERIENCE.JOBS.THELABIT',
    responsibilities: 4,
    current: true,
    tags: [
      'Angular',
      'React Native',
      'NestJS',
      'Python',
      'AWS',
      'MySQL',
      'Git',
      'OracleSQL',
      'HTML5',
      'CSS3',
      'Jira',
      'OpenShift',
    ],
    subProjects: [
      {
        key: 'EXPERIENCE.JOBS.THELABIT.PROJECTS.INSPECTIA',
        tags: [
          'Angular',
          'NestJS',
          'Prisma',
          'FastAPI',
          'Python',
          'Docker',
          'AWS',
          'IA',
        ],
      },
      {
        key: 'EXPERIENCE.JOBS.THELABIT.PROJECTS.CREDENTIAL_WALLET',
        tags: ['React Native', 'NestJS', 'MySQL'],
      },
      {
        key: 'EXPERIENCE.JOBS.THELABIT.PROJECTS.ATSA',
        tags: ['React Native', 'Angular', 'NestJS', 'TypeORM', 'MySQL'],
      },
    ],
  },
  {
    key: 'EXPERIENCE.JOBS.DEPSYS',
    responsibilities: 3,
    current: false,
    tags: [
      'Angular',
      'TypeScript',
      'JasperSoft',
      'Visual Basic',
      'HTML5',
      'CSS3',
    ],
  },
];

const PROJECTS: ProjectItem[] = [
  {
    key: 'PROJECTS.ITEMS.PORTFOLIO',
    image: '/assets/images/projects/portfolio.png',
    icon: '/assets/images/projects/portfolio-icon.png',
    repository: 'https://github.com/DavidLBruno/portfolio',
    deploy: 'https://www.bruno-david.com/',
    tags: ['Angular', 'SSR', 'SCSS'],
    type: 'personal',
  },
  {
    key: 'PROJECTS.ITEMS.WALLET',
    image: '/assets/images/projects/wallet-digital.png',
    icon: '/assets/images/projects/wallet-digital-icon.png',
    repository: 'https://github.com/DavidLBruno/grupo-n-1',
    tags: ['Node.js', 'React', 'PostgreSQL'],
    type: 'group',
  },
  {
    key: 'PROJECTS.ITEMS.VLIXES',
    image: '/assets/images/projects/e-commerce.png',
    icon: '/assets/images/projects/e-commerce-logo.png',
    deploy: 'https://pf-vlixes-main.vercel.app/',
    tags: ['React', 'Node.js', 'Redux'],
    type: 'group',
  },
  {
    key: 'PROJECTS.ITEMS.POKEMON',
    image: '/assets/images/projects/pokemon.png',
    icon: '/assets/images/projects/game1.png',
    deploy: 'https://pi-pokemon-eta.vercel.app/',
    repository: 'https://github.com/DavidLBruno/PI-POKEMON',
    tags: ['React', 'Redux', 'Express', 'PostgreSQL', 'Sequelize'],
    type: 'personal',
  },
  {
    key: 'PROJECTS.ITEMS.SHARED_EXPENSES',
    image: '/assets/images/projects/gastos_compartidos.png',
    deploy: 'https://vps-4441022-x.dattaweb.com/auth',
    tags: ['Angular', 'NestJS', 'PostgreSQL', 'SCSS'],
    type: 'personal',
  },
  {
    key: 'PROJECTS.ITEMS.FOOD_CODE',
    image: '/assets/images/projects/food_code.png',
    deploy: 'https://food-code-front.pages.dev/',
    tags: ['Angular', 'NestJS', 'TypeORM', 'PostgreSQL'],
    type: 'group',
  },
];
