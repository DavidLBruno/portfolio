import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslocoModule } from '@ngneat/transloco';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faLocationDot, faEnvelope, faArrowRight, faDownload } from '@fortawesome/free-solid-svg-icons';
import { faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';
import { RouterModule } from '@angular/router';
import { ContactModalComponent } from '../contact-modal/contact-modal.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [CommonModule, TranslocoModule, FontAwesomeModule, RouterModule, ContactModalComponent],
})
export class HomeComponent {
  faLocation = faLocationDot;
  faEnvelope = faEnvelope;
  faArrow = faArrowRight;
  faDownload = faDownload;
  faLinkedin = faLinkedin;
  faGithub = faGithub;

  showContactModal = false;

  socialLinks = [
    { icon: this.faGithub, url: 'https://github.com/DavidLBruno', label: 'GitHub' },
    { icon: this.faLinkedin, url: 'https://www.linkedin.com/in/bruno-developer/', label: 'LinkedIn' },
  ];

  openContactModal() {
    this.showContactModal = true;
    // Prevent body scrolling
    if (typeof document !== 'undefined') {
      document.body.style.overflow = 'hidden';
    }
  }

  closeContactModal() {
    this.showContactModal = false;
    if (typeof document !== 'undefined') {
      document.body.style.overflow = '';
    }
  }
}
