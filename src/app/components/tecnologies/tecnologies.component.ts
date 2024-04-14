import { CommonModule } from '@angular/common'
import { Component } from '@angular/core'

@Component({
  selector: 'app-tecnologies',
  templateUrl: './tecnologies.component.html',
  styleUrls: ['./tecnologies.component.scss'],
  imports: [CommonModule],
  standalone: true,
})
export class TecnologiesComponent {
  tecnologies = [
    {
      title: 'Lenguajes',
      items: [
        { title: 'JavaScript' },
        { title: 'TypeScript' },
        { title: 'Python' },
        { title: 'C++' },
      ],
    },
    {
      title: 'Frontend',
      items: [
        { title: 'Angular' },
        { title: 'React' },
        { title: 'React Native' },
        { title: 'Redux' },
        { title: 'CSS' },
        { title: 'HTML' },
        { title: 'Boostrap' },
      ],
    },
    {
      title: 'Backend',
      items: [
        { title: 'NodeJs' },
        { title: 'Express' },
        { title: 'Sequelize' },
        { title: 'SQL' },
        { title: 'MongoDb' },
        { title: 'Postman' },
      ],
    },
    {
      title: 'DevOps',
      items: [
        { title: 'Docker' },
        { title: 'Ubuntu' },
        { title: 'Bash' },
        { title: 'Vim' },
      ],
    },
  ]
}
