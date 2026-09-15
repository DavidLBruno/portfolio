import { FilterScrollDirective } from '../../directives/filter-scroll.directive';
import { Component, DestroyRef, OnInit, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslocoModule } from '@jsverse/transloco';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import {
  faGraduationCap,
  faChess,
  faMicrochip,
  faDumbbell,
  faCertificate,
} from '@fortawesome/free-solid-svg-icons';
import { faJs } from '@fortawesome/free-brands-svg-icons';

/** `key` points to ABOUT.EDUCATION.* in assets/i18n; the template resolves the texts. */
interface Education {
  key: string;
  institutionLink: string;
  current: boolean;
  tags?: string[];
  certificate?: string;
}

interface Hobby {
  key: string;
  icon: IconDefinition;
}

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  imports: [TranslocoModule, FontAwesomeModule, FilterScrollDirective],
})
export class AboutComponent implements OnInit {
  faGrad = faGraduationCap;
  faCert = faCertificate;

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private destroyRef = inject(DestroyRef);

  selectedTech = signal<string | null>(null);
  estudios = signal<Education[]>([]);

  hobbies: Hobby[] = [
    { key: 'ABOUT.HOBBIES.COMPETITIVE_PROGRAMMING', icon: faJs },
    { key: 'ABOUT.HOBBIES.CHESS', icon: faChess },
    { key: 'ABOUT.HOBBIES.PC_HARDWARE', icon: faMicrochip },
    { key: 'ABOUT.HOBBIES.SPORTS', icon: faDumbbell },
  ];

  ngOnInit() {
    this.route.queryParams
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(params => {
        const tech = params['tech'] || null;
        this.selectedTech.set(tech);

        this.estudios.set([...EDUCATION]);
      });
  }

  isMatch(tag: string): boolean {
    const tech = this.selectedTech();
    return !!tech && tag.toLowerCase() === tech.toLowerCase();
  }

  hasTechEdu(edu: Education): boolean {
    if (!this.selectedTech()) return true;
    return (edu.tags ?? []).some(t => this.isMatch(t));
  }

  clearFilter() {
    this.router.navigate(['/about']);
  }
}

const EDUCATION: Education[] = [
  {
    key: 'ABOUT.EDUCATION.UAI',
    institutionLink: 'https://uai.edu.ar/',
    current: true,
    tags: ['C', 'C#', '.NET Framework', 'SQL', 'Git'],
  },
  {
    key: 'ABOUT.EDUCATION.EFSET',
    institutionLink: 'https://www.efset.org/',
    current: true,
    certificate: 'https://cert.efset.org/A9gUpb',
  },
  {
    key: 'ABOUT.EDUCATION.UNR',
    institutionLink: 'https://unr.edu.ar/',
    current: false,
    tags: ['Python', 'Bash', 'Docker', 'Linux', 'Git'],
  },
  {
    key: 'ABOUT.EDUCATION.TC_ARG',
    institutionLink: 'https://www.pc-arg.com/tc-arg',
    current: false,
    tags: ['C++'],
    certificate: '/assets/certificates/tc-arg.pdf',
  },
  {
    key: 'ABOUT.EDUCATION.HENRY',
    institutionLink: 'https://www.soyhenry.com/',
    current: false,
    tags: [
      'JavaScript',
      'React',
      'Node.js',
      'Express',
      'PostgreSQL',
      'Sequelize',
      'Git',
    ],
    certificate: '/assets/certificates/henry.pdf',
  },
  {
    key: 'ABOUT.EDUCATION.ALKEMY',
    institutionLink: 'https://www.alkemy.org/',
    current: false,
    tags: ['Node.js', 'Express', 'TypeScript', 'Git'],
    certificate: '/assets/certificates/alkemy.pdf',
  },
];
