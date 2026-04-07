import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TranslocoModule } from '@ngneat/transloco';
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
  faHeart,
  faLocationDot,
} from '@fortawesome/free-solid-svg-icons';
import { VersionService } from '../../services/version/version.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  imports: [CommonModule, FontAwesomeModule, TranslocoModule],
  standalone: true,
})
export class FooterComponent implements OnInit {
  faHeart = faHeart;
  faLocation = faLocationDot;

  socialLinks = [
    { icon: faLinkedin, url: 'https://www.linkedin.com/in/bruno-developer/', label: 'LinkedIn' },
    { icon: faGithub, url: 'https://github.com/DavidLBruno', label: 'GitHub' },
    { icon: faInstagram, url: 'https://www.instagram.com/brunod.01/', label: 'Instagram' },
    { icon: faDiscord, url: 'https://www.linkedin.com/in/bruno-developer/', label: 'Discord' },
    { icon: faCode, url: 'https://codeforces.com/profile/DevidB', label: 'Codeforces' },
    { icon: faChessKnight, url: 'https://lichess.org/@/DeividL', label: 'Lichess' },
  ];

  contactLinks = [
    { icon: faWhatsapp, url: 'https://wa.me/543412705762', label: 'WhatsApp' },
    { icon: faTelegram, url: 'https://t.me/brunodavidl', label: 'Telegram' },
    { icon: faEnvelope, url: 'mailto:bruno.david9914@gmail.com', label: 'Email' },
  ];

  versionProyect = '';
  currentYear = new Date().getFullYear();

  constructor(private version: VersionService) {}

  ngOnInit(): void {
    this.versionProyect = this.version.getVersion();
  }
}
