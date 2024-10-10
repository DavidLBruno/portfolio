import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TranslocoModule } from '@ngneat/transloco';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
  imports: [CommonModule, TranslocoModule],
  standalone: true,
})
export class ProjectsComponent {
  works = [
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

  projects = [
    {
      title: 'Portfolio',
      desciption: 'PROJECTS.PROJECTS.INDIVIDUAL-PROJECT',
      tecnologias: [
        {
          title: '',
        },
      ],
    },
    {
      title: 'Wallet digital',
      desciption: 'PROJECTS.PROJECTS.GROUP-PROJECT',
      tecnologias: [
        {
          title: '',
        },
      ],
    },
    {
      title: 'E-commerce',
      desciption: 'PROJECTS.PROJECTS.GROUP-PROJECT',
      tecnologias: [
        {
          title: '',
        },
      ],
    },
    {
      title: 'Pokemon',
      desciption: 'PROJECTS.PROJECTS.INDIVIDUAL-PROJECT',
      tecnologias: [
        {
          title: '',
        },
      ],
    },
  ];
}
