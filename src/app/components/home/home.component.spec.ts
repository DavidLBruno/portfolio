import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { HomeComponent } from './home.component';
import { getTranslocoTestingModule } from '../../testing/transloco-testing';

describe('HomeComponent', () => {
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeComponent, getTranslocoTestingModule()],
      providers: [provideRouter([])],
    }).compileComponents();
    fixture = TestBed.createComponent(HomeComponent);
    fixture.detectChanges();
  });

  afterEach(() => {
    document.body.style.overflow = '';
  });

  it('renders the translated hero and CV link', () => {
    const el = fixture.nativeElement as HTMLElement;
    expect(el.querySelector('.hero-greeting')?.textContent).toContain(
      'Hola, soy',
    );
    expect(el.querySelector('a[href="/assets/cv.pdf"]')?.textContent).toContain(
      'Descargar CV',
    );
    expect(el.textContent).not.toContain('HOME.');
  });

  it('opens and closes the contact modal, locking body scroll meanwhile', () => {
    const el = fixture.nativeElement as HTMLElement;
    (el.querySelector('.btn-primary-hero') as HTMLButtonElement).click();
    fixture.detectChanges();
    expect(el.querySelector('app-contact-modal')).toBeTruthy();
    expect(document.body.style.overflow).toBe('hidden');

    fixture.componentInstance.closeContactModal();
    fixture.detectChanges();
    expect(el.querySelector('app-contact-modal')).toBeNull();
    expect(document.body.style.overflow).toBe('');
  });

  it('opens external links safely', () => {
    const el = fixture.nativeElement as HTMLElement;
    const links = el.querySelectorAll<HTMLAnchorElement>('a[target="_blank"]');
    expect(links.length).toBeGreaterThan(0);
    links.forEach(a => expect(a.rel).toContain('noopener'));
  });
});
