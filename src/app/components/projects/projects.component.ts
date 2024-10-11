import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TranslocoModule } from '@ngneat/transloco';
import { Project } from '../../interfaces/project.interface';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
  imports: [CommonModule, TranslocoModule],
  standalone: true,
})
export class ProjectsComponent {
  works: Project[] = [
    {
      title: 'Backend NodeJs',
      subtitle: 'TheLabIT',
      desciption: '',
      tecnologias: [
        {
          title: '',
        },
      ],
    },
    {
      title: 'FullStack',
      subtitle: 'Freelance',

      desciption: '',
      tecnologias: [
        {
          title: '',
        },
      ],
    },
    {
      title: 'Frontend Angular',
      subtitle: 'Depsys',
      desciption: '',
      tecnologias: [
        {
          title: '',
        },
      ],
    },
  ];

  projects: Project[] = [
    {
      title: 'Portfolio',
      desciption: 'PROJECTS.PROJECTS.INDIVIDUAL-PROJECT',
      image: '/assets/images/projects/portfolio.png',
      icon: '/assets/images/projects/portfolio-icon.png',
      repository: 'https://github.com/DavidLBruno/portfolio',
      tecnologias: [
        {
          title: '',
        },
      ],
    },
    {
      title: 'Wallet digital',
      desciption: 'PROJECTS.PROJECTS.GROUP-PROJECT',
      image: '/assets/images/projects/wallet-digital.png',
      icon: '/assets/images/projects/wallet-digital-icon.png',
      repository: 'https://github.com/DavidLBruno/grupo-n-1',
      tecnologias: [
        {
          title: '',
        },
      ],
    },
    {
      title: 'E-commerce',
      desciption: 'PROJECTS.PROJECTS.GROUP-PROJECT',
      image: '/assets/images/projects/e-commerce.png',
      icon: '/assets/images/projects/e-commerce-logo.png',
      repository: '',
      deploy: 'https://pf-vlixes-main.vercel.app/',
      tecnologias: [
        {
          title: '',
        },
      ],
    },
    {
      title: 'Pokemon',
      desciption: 'PROJECTS.PROJECTS.INDIVIDUAL-PROJECT',
      image: '/assets/images/projects/pokemon.png',
      icon: '/assets/images/projects/game1.png',
      deploy: 'https://pi-pokemon-eta.vercel.app/',
      repository: 'https://github.com/DavidLBruno/PI-POKEMON',
      tecnologias: [
        {
          title: '',
        },
      ],
    },
  ];
}
