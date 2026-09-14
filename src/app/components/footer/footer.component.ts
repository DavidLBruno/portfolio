import { Component, inject } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TranslocoModule } from '@jsverse/transloco';
import {
  faLinkedin,
  faInstagram,
  faWhatsapp,
  faTelegram,
  faGithub,
} from '@fortawesome/free-brands-svg-icons';
import {
  faChessKnight,
  faCode,
  faEnvelope,
  faLocationDot,
} from '@fortawesome/free-solid-svg-icons';
import { VersionService } from '../../services/version/version.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  imports: [FontAwesomeModule, TranslocoModule],
})
export class FooterComponent {
  faLocation = faLocationDot;

  socialLinks = [
    {
      icon: faLinkedin,
      url: 'https://www.linkedin.com/in/bruno-developer/',
      label: 'LinkedIn',
    },
    { icon: faGithub, url: 'https://github.com/DavidLBruno', label: 'GitHub' },
    {
      icon: faInstagram,
      url: 'https://www.instagram.com/brunod.01/',
      label: 'Instagram',
    },
    {
      icon: faCode,
      url: 'https://codeforces.com/profile/DevidB',
      label: 'Codeforces',
    },
    {
      icon: faChessKnight,
      url: 'https://lichess.org/@/DeividL',
      label: 'Lichess',
    },
  ];

  contactLinks = [
    { icon: faWhatsapp, url: 'https://wa.me/543412705762', label: 'WhatsApp' },
    { icon: faTelegram, url: 'https://t.me/brunodavidl', label: 'Telegram' },
    {
      icon: faEnvelope,
      url: 'mailto:bruno.david9914@gmail.com',
      label: 'Email',
    },
  ];

  versionProyect = inject(VersionService).getVersion();
  currentYear = new Date().getFullYear();
}
