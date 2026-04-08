import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslocoModule } from '@ngneat/transloco';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faGraduationCap, faGamepad, faChess, faMicrochip, faAppleWhole, faDumbbell, faCertificate } from '@fortawesome/free-solid-svg-icons';
import { faJs } from '@fortawesome/free-brands-svg-icons';

interface Education {
  title: string;
  institution: string;
  institutionLink: string;
  period: string;
  current: boolean;
  description: string;
  tags?: string[];
  certificate?: string;
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
export class AboutComponent implements OnInit {
  faGrad = faGraduationCap;
  faCert = faCertificate;
  
  selectedTech: string | null = null;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.selectedTech = params['tech'] || null;
      if (this.selectedTech && typeof window !== 'undefined') {
        const doc = document.getElementById('education-section');
        if (doc) doc.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  hasTechEdu(edu: Education): boolean {
    if (!this.selectedTech) return true;
    if (!edu.tags) return false;
    return edu.tags.some(
      (t) => t.toLowerCase() === this.selectedTech?.toLowerCase()
    );
  }

  clearFilter() {
    this.router.navigate(['/about']);
  }

  estudios: Education[] = [
    {
      title: 'Ingeniería en Sistemas Informáticos',
      institution: 'UAI – Universidad Abierta Interamericana',
      institutionLink: 'https://uai.edu.ar/',
      period: '2024 – En curso',
      current: true,
      description: 'Formación integral en sistemas informáticos con enfoque en la ingeniería de software.',
      tags: ['C', 'C#', '.NET Framework', 'SQL', 'Git']
    },
    {
      title: 'Tecnicatura Universitaria en Inteligencia Artificial',
      institution: 'Universidad Nacional de Rosario',
      institutionLink: 'https://unr.edu.ar/',
      period: 'Febrero 2023 – 2024',
      current: false,
      description: 'Cursada finalizada (sin titulación). Estudio de fundamentos de IA, machine learning y procesamiento de datos.',
      tags: ['Python', 'Bash', 'Docker', 'Linux', 'Git']
    },
    {
      title: 'Training Camp de Programación Competitiva',
      institution: 'TC ARG',
      institutionLink: 'https://www.pc-arg.com/tc-arg',
      period: 'Julio 2023',
      current: false,
      description: 'Entrenamiento intensivo de 2 semanas enfocado en resolución de problemas complejos, diseño de algoritmos y structures de datos.',
      tags: ['C++'],
      certificate: '/assets/certificates/tc-arg.pdf'
    },
    {
      title: 'Full Stack Web Developer',
      institution: 'Henry Bootcamp',
      institutionLink: 'https://www.soyhenry.com/',
      period: 'Diciembre 2021 – Agosto 2022',
      current: false,
      description: 'Programa intensivo de 700 horas cubriendo el stack PERN (PostgreSQL, Express, React, Node.js).',
      tags: ['JavaScript', 'React', 'Node.js', 'Express', 'PostgreSQL', 'Sequelize', 'Git'],
      certificate: '/assets/certificates/henry.pdf'
    },
    {
      title: 'SkillUp Node.js',
      institution: 'Alkemy',
      institutionLink: 'https://www.alkemy.org/',
      period: 'Noviembre 2022',
      current: false,
      description: 'Programa especializado en desarrollo backend con Node.js.',
      tags: ['Node.js', 'Express', 'TypeScript', 'Git'],
      certificate: '/assets/certificates/alkemy.pdf'
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
