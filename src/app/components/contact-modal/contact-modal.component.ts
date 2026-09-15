import {
  Component,
  HostListener,
  computed,
  output,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslocoModule } from '@jsverse/transloco';
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
import { environment } from '../../../environments/environment';

const EMPTY_FORM = { name: '', email: '', message: '', website: '' };
const MIN_MESSAGE_LENGTH = 10;
const MAX_NAME_LENGTH = 100;
const MAX_MESSAGE_LENGTH = 2000;

@Component({
  selector: 'app-contact-modal',
  templateUrl: './contact-modal.component.html',
  styleUrls: ['./contact-modal.component.scss'],
  imports: [FormsModule, TranslocoModule, FontAwesomeModule],
})
export class ContactModalComponent {
  closeModal = output<void>();

  // Icons
  faClose = faXmark;
  faSend = faPaperPlane;
  faSuccess = faCircleCheck;
  faError = faCircleExclamation;
  faSpinner = faSpinner;
  faUser = faUser;
  faEnvelope = faEnvelope;
  faMessage = faMessage;

  readonly minMessageLength = MIN_MESSAGE_LENGTH;
  readonly maxNameLength = MAX_NAME_LENGTH;
  readonly maxMessageLength = MAX_MESSAGE_LENGTH;

  // Form state (`website` is a honeypot: humans never see it, bots fill it)
  formData = signal({ ...EMPTY_FORM });

  // UI state
  isClosing = signal(false);
  isSending = signal(false);
  sendStatus = signal<'idle' | 'success' | 'error'>('idle');

  // Focused field tracking for label animations
  focusedField = signal<string | null>(null);

  isFormValid = computed(() => {
    const { name, email, message } = this.formData();
    return (
      name.trim().length > 0 &&
      name.length <= MAX_NAME_LENGTH &&
      this.isValidEmail(email) &&
      message.trim().length > MIN_MESSAGE_LENGTH &&
      message.length <= MAX_MESSAGE_LENGTH
    );
  });

  @HostListener('document:keydown.escape')
  onEscKey() {
    this.close();
  }

  close() {
    this.isClosing.set(true);
    setTimeout(() => this.closeModal.emit(), 300);
  }

  onBackdropClick(event: MouseEvent) {
    if ((event.target as HTMLElement).classList.contains('modal-overlay')) {
      this.close();
    }
  }

  updateField(field: keyof typeof EMPTY_FORM, value: string) {
    this.formData.update(data => ({ ...data, [field]: value }));
  }

  onFocus(field: string) {
    this.focusedField.set(field);
  }

  onBlur() {
    this.focusedField.set(null);
  }

  isValidEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  async sendEmail() {
    if (!this.isFormValid() || this.isSending()) return;

    const data = this.formData();

    // Anti-bot: a filled honeypot gets a fake success and no email is sent.
    if (data.website !== '') {
      this.isSending.set(true);
      setTimeout(() => {
        this.isSending.set(false);
        this.sendStatus.set('success');
        this.formData.set({ ...EMPTY_FORM });
        setTimeout(() => this.close(), 3000);
      }, 800);
      return;
    }

    this.isSending.set(true);
    this.sendStatus.set('idle');

    try {
      await emailjs.send(
        environment.emailjs.serviceId,
        environment.emailjs.templateId,
        {
          from_name: data.name.trim(),
          from_email: data.email.trim(),
          message: data.message.trim(),
        },
        { publicKey: environment.emailjs.publicKey },
      );

      this.sendStatus.set('success');
      this.formData.set({ ...EMPTY_FORM });

      // Auto-close after success
      setTimeout(() => this.close(), 3000);
    } catch (error) {
      console.error('EmailJS error:', error);
      this.sendStatus.set('error');
    } finally {
      this.isSending.set(false);
    }
  }
}
