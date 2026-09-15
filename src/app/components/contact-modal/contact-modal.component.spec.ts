import { ComponentFixture, TestBed } from '@angular/core/testing';
import emailjs from '@emailjs/browser';
import { ContactModalComponent } from './contact-modal.component';
import { getTranslocoTestingModule } from '../../testing/transloco-testing';

describe('ContactModalComponent', () => {
  let fixture: ComponentFixture<ContactModalComponent>;
  let component: ContactModalComponent;

  beforeEach(async () => {
    vi.useFakeTimers();
    await TestBed.configureTestingModule({
      imports: [ContactModalComponent, getTranslocoTestingModule()],
    }).compileComponents();
    fixture = TestBed.createComponent(ContactModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  const fill = (
    data: Partial<{
      name: string;
      email: string;
      message: string;
      website: string;
    }>,
  ) => {
    for (const [field, value] of Object.entries(data)) {
      component.updateField(
        field as 'name' | 'email' | 'message' | 'website',
        value,
      );
    }
    fixture.detectChanges();
  };

  it('keeps the submit button disabled until the form is valid', () => {
    const button = () =>
      (fixture.nativeElement as HTMLElement).querySelector(
        '.btn-submit',
      ) as HTMLButtonElement;

    expect(button().disabled).toBe(true);

    fill({
      name: 'Test',
      email: 'not-an-email',
      message: 'A long enough message',
    });
    expect(component.isFormValid()).toBe(false);
    expect(button().disabled).toBe(true);

    fill({ email: 'test@example.com', message: 'short' });
    expect(component.isFormValid()).toBe(false);

    fill({ message: 'A long enough message' });
    expect(component.isFormValid()).toBe(true);
    expect(button().disabled).toBe(false);
  });

  it('rejects oversized input', () => {
    fill({
      name: 'x'.repeat(101),
      email: 'test@example.com',
      message: 'A long enough message',
    });
    expect(component.isFormValid()).toBe(false);
    fill({ name: 'ok', message: 'x'.repeat(2001) });
    expect(component.isFormValid()).toBe(false);
  });

  it('sends trimmed data through EmailJS and shows the success state', async () => {
    const send = vi
      .spyOn(emailjs, 'send')
      .mockResolvedValue({ status: 200, text: 'OK' });
    fill({
      name: '  Test  ',
      email: 'test@example.com',
      message: 'A long enough message ',
    });

    await component.sendEmail();
    fixture.detectChanges();

    expect(send).toHaveBeenCalledTimes(1);
    expect(send.mock.calls[0][2]).toEqual({
      from_name: 'Test',
      from_email: 'test@example.com',
      message: 'A long enough message',
    });
    expect(component.sendStatus()).toBe('success');
    expect(component.formData().name).toBe('');
    expect(
      (fixture.nativeElement as HTMLElement).querySelector(
        '.status-message.success',
      ),
    ).toBeTruthy();
  });

  it('shows the error state when EmailJS fails', async () => {
    vi.spyOn(emailjs, 'send').mockRejectedValue(new Error('boom'));
    vi.spyOn(console, 'error').mockImplementation(() => {});
    fill({
      name: 'Test',
      email: 'test@example.com',
      message: 'A long enough message',
    });

    await component.sendEmail();
    fixture.detectChanges();

    expect(component.sendStatus()).toBe('error');
    expect(component.isSending()).toBe(false);
    expect(
      (fixture.nativeElement as HTMLElement).querySelector(
        '.status-message.error',
      ),
    ).toBeTruthy();
  });

  it('silently drops submissions that fill the honeypot', async () => {
    const send = vi.spyOn(emailjs, 'send');
    fill({
      name: 'Bot',
      email: 'bot@example.com',
      message: 'A long enough message',
      website: 'x',
    });

    await component.sendEmail();
    vi.advanceTimersByTime(800);

    expect(send).not.toHaveBeenCalled();
    expect(component.sendStatus()).toBe('success');
  });

  it('closes on Escape after the exit animation', () => {
    const closed = vi.fn();
    component.closeModal.subscribe(closed);
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    expect(component.isClosing()).toBe(true);
    expect(closed).not.toHaveBeenCalled();
    vi.advanceTimersByTime(300);
    expect(closed).toHaveBeenCalledTimes(1);
  });
});
