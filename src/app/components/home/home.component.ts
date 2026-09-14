import { Component, signal } from '@angular/core';
import { TranslocoModule } from '@jsverse/transloco';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faLocationDot,
  faEnvelope,
  faArrowRight,
  faDownload,
} from '@fortawesome/free-solid-svg-icons';
import { faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';
import { RouterModule } from '@angular/router';
import { ContactModalComponent } from '../contact-modal/contact-modal.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [
    TranslocoModule,
    FontAwesomeModule,
    RouterModule,
    ContactModalComponent,
  ],
})
export class HomeComponent {
  faLocation = faLocationDot;
  faEnvelope = faEnvelope;
  faArrow = faArrowRight;
  faDownload = faDownload;

  showContactModal = signal(false);

  socialLinks = [
    { icon: faGithub, url: 'https://github.com/DavidLBruno', label: 'GitHub' },
    {
      icon: faLinkedin,
      url: 'https://www.linkedin.com/in/bruno-developer/',
      label: 'LinkedIn',
    },
  ];

  openContactModal() {
    this.showContactModal.set(true);
    // Prevent body scrolling while the modal is open
    if (typeof document !== 'undefined') {
      document.body.style.overflow = 'hidden';
    }
  }

  closeContactModal() {
    this.showContactModal.set(false);
    if (typeof document !== 'undefined') {
      document.body.style.overflow = '';
    }
  }
}
