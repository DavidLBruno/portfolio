import { Component, EventEmitter, Output, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslocoModule } from '@ngneat/transloco';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faXmark,
  faPaperPlane,
  faCircleCheck,
  faCircleExclamation,
  faSpinner,
  faUser,
  faEnvelope,
  faMessage,
} from '@fortawesome/free-solid-svg-icons';
import emailjs from '@emailjs/browser';

// ─────────────────────────────────────────────
// ⚠️  EmailJS Configuration
// Replace these with your real EmailJS credentials:
// 1. Create a free account at https://www.emailjs.com/
// 2. Add an email service (Gmail, Outlook, etc.)
// 3. Create a template with variables: {{from_name}}, {{from_email}}, {{message}}
// 4. Copy your Service ID, Template ID, and Public Key below
// ─────────────────────────────────────────────
const EMAILJS_SERVICE_ID = 'service_ecan7om';
const EMAILJS_TEMPLATE_ID = 'template_3a4iifo';
const EMAILJS_PUBLIC_KEY = 'oOnC2LcHyRp5NO0CE';

@Component({
  selector: 'app-contact-modal',
  templateUrl: './contact-modal.component.html',
  styleUrls: ['./contact-modal.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, TranslocoModule, FontAwesomeModule],
})
export class ContactModalComponent {
  @Output() closeModal = new EventEmitter<void>();

  // Icons
  faClose = faXmark;
  faSend = faPaperPlane;
  faSuccess = faCircleCheck;
  faError = faCircleExclamation;
  faSpinner = faSpinner;
  faUser = faUser;
  faEnvelope = faEnvelope;
  faMessage = faMessage;

  // Form state
  formData = {
    name: '',
    email: '',
    message: '',
    website: '', // Honeypot field
  };

  // UI state
  isClosing = false;
  isSending = false;
  sendStatus: 'idle' | 'success' | 'error' = 'idle';

  // Focused field tracking for label animations
  focusedField: string | null = null;

  @HostListener('document:keydown.escape')
  onEscKey() {
    this.close();
  }

  close() {
    this.isClosing = true;
    setTimeout(() => {
      this.closeModal.emit();
    }, 300);
  }

  onBackdropClick(event: MouseEvent) {
    if ((event.target as HTMLElement).classList.contains('modal-overlay')) {
      this.close();
    }
  }

  onFocus(field: string) {
    this.focusedField = field;
  }

  onBlur(field: string) {
    this.focusedField = null;
  }

  isValidEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  get isFormValid(): boolean {
    return (
      this.formData.name.trim().length > 0 &&
      this.isValidEmail(this.formData.email) &&
      this.formData.message.trim().length > 10
    );
  }

  async sendEmail() {
    if (!this.isFormValid || this.isSending) return;

    // ----- Anti-Bot Protection (Honeypot) -----
    // If a bot fills out this hidden field, we act like it was successful
    // but we don't actually send the email. This prevents spam.
    if (this.formData.website !== '') {
      this.isSending = true;
      setTimeout(() => {
        this.sendStatus = 'success';
        this.formData = { name: '', email: '', message: '', website: '' };
        setTimeout(() => this.close(), 3000);
      }, 800);
      return;
    }
    // ------------------------------------------

    this.isSending = true;
    this.sendStatus = 'idle';

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: this.formData.name,
          from_email: this.formData.email,
          message: this.formData.message,
        },
        EMAILJS_PUBLIC_KEY,
      );

      this.sendStatus = 'success';
      this.formData = { name: '', email: '', message: '', website: '' };

      // Auto-close after success
      setTimeout(() => this.close(), 3000);
    } catch (error) {
      console.error('EmailJS error:', error);
      this.sendStatus = 'error';
    } finally {
      this.isSending = false;
    }
  }
}
