import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faLinkedin,
  faInstagram,
  faWhatsapp,
  faTelegram,
  faDiscord,
  faGithub,
} from '@fortawesome/free-brands-svg-icons';
import {
  faChessKnight,
  faCode,
  faEnvelope,
  faSignature,
  faFile,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  imports: [CommonModule, FontAwesomeModule],
  standalone: true,
})
export class FooterComponent {
  columns = [
    {
      title: 'Sobre mi',
      subColumns: [
        {
          title: 'Bruno David',
          link: '',
          icon: faSignature,
        },
        {
          title: 'Mi cv',
          link: '',
          icon: faFile,
        },
      ],
    },
    {
      title: 'Redes sociales',
      subColumns: [
        {
          title: 'Linkedin',
          link: 'https://www.linkedin.com/in/bruno-developer/',
          icon: faLinkedin,
        },
        {
          title: 'GitHub',
          link: 'https://github.com/DavidLBruno',
          icon: faGithub,
        },
        {
          title: 'Discord',
          link: 'https://www.linkedin.com/in/bruno-developer/',
          icon: faDiscord,
        },
        {
          title: 'Instagram',
          link: 'https://www.instagram.com/brunod.01/',
          icon: faInstagram,
        },
        {
          title: 'CODEFORCES',
          link: 'https://codeforces.com/profile/DevidB',
          icon: faCode,
        },
        {
          title: 'LICHESS',
          link: 'https://lichess.org/@/DeividL',
          icon: faChessKnight,
        },
      ],
    },
    {
      title: 'Contacto',
      subColumns: [
        {
          title: 'WhatsApp',
          link: 'https://wa.me/543412705762',
          icon: faWhatsapp,
        },
        {
          title: 'Telegram',
          link: 'https://t.me/brunodavidl',
          icon: faTelegram,
        },
        {
          title: 'Mail',
          link: 'mailto:bruno.david9914@gmail.com?',
          icon: faEnvelope,
        },
      ],
    },
  ];
}
