import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslocoModule } from '@ngneat/transloco';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faLocationDot, faEnvelope, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [CommonModule, TranslocoModule, FontAwesomeModule, RouterModule],
})
export class HomeComponent {
  faLocation = faLocationDot;
  faEnvelope = faEnvelope;
  faArrow = faArrowRight;
  faLinkedin = faLinkedin;
  faGithub = faGithub;

  socialLinks = [
    { icon: this.faGithub, url: 'https://github.com/DavidLBruno', label: 'GitHub' },
    { icon: this.faLinkedin, url: 'https://www.linkedin.com/in/bruno-developer/', label: 'LinkedIn' },
  ];
}
