import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TranslocoModule } from '@ngneat/transloco';

interface TechCategory {
  title: string;
  icon: string;
  items: { title: string }[];
}

@Component({
  selector: 'app-tecnologies',
  templateUrl: './tecnologies.component.html',
  styleUrls: ['./tecnologies.component.scss'],
  imports: [CommonModule, TranslocoModule],
  standalone: true,
})
export class TecnologiesComponent {
  tecnologies: TechCategory[] = [
    {
      title: 'Lenguajes',
      icon: '💻',
      items: [
        { title: 'JavaScript' },
        { title: 'TypeScript' },
        { title: 'Python' },
        { title: 'SQL' },
      ],
    },
    {
      title: 'Backend',
      icon: '⚙️',
      items: [
        { title: 'Node.js' },
        { title: 'NestJS' },
        { title: 'Express' },
        { title: 'Sequelize' },
        { title: 'TypeORM' },
        { title: 'Prisma' },
        { title: '.NET Framework' },
      ],
    },
    {
      title: 'Frontend',
      icon: '🎨',
      items: [
        { title: 'Angular' },
        { title: 'React' },
        { title: 'Redux' },
        { title: 'HTML5' },
        { title: 'CSS3' },
        { title: 'Sass' },
        { title: 'SSR' },
      ],
    },
    {
      title: 'Mobile',
      icon: '📱',
      items: [
        { title: 'React Native' },
      ],
    },
    {
      title: 'Bases de Datos',
      icon: '🗃️',
      items: [
        { title: 'PostgreSQL' },
        { title: 'MySQL' },
        { title: 'SQL Server' },
        { title: 'OracleSQL' },
        { title: 'MongoDB' },
      ],
    },
    {
      title: 'Herramientas & Infra',
      icon: '🛠️',
      items: [
        { title: 'Git' },
        { title: 'AWS' },
        { title: 'Docker' },
        { title: 'OpenShift' },
        { title: 'Linux' },
      ],
    },
  ];
}
