import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router, provideRouter } from '@angular/router';
import { Component } from '@angular/core';
import { NavbarComponent } from './navbar.component';
import { ChangeSettingService } from '../../services/change-settings/change-settings.service';
import { getTranslocoTestingModule } from '../../testing/transloco-testing';

@Component({ template: '' })
class DummyComponent {}

describe('NavbarComponent', () => {
  let fixture: ComponentFixture<NavbarComponent>;
  let router: Router;

  beforeEach(async () => {
    localStorage.clear();
    await TestBed.configureTestingModule({
      imports: [NavbarComponent, getTranslocoTestingModule()],
      providers: [
        provideRouter([
          { path: '', component: DummyComponent },
          { path: 'projects', component: DummyComponent },
          { path: 'about', component: DummyComponent },
          { path: 'tecnologies', component: DummyComponent },
        ]),
      ],
    }).compileComponents();
    router = TestBed.inject(Router);
    fixture = TestBed.createComponent(NavbarComponent);
    fixture.detectChanges();
  });

  const activeLinks = () =>
    Array.from(
      (fixture.nativeElement as HTMLElement).querySelectorAll(
        '.main-nav-link.active',
      ),
    ).map(a => a.textContent?.trim());

  it('renders the translated links', () => {
    const el = fixture.nativeElement as HTMLElement;
    const labels = Array.from(el.querySelectorAll('.main-nav-link')).map(a =>
      a.textContent?.trim(),
    );
    expect(labels).toEqual([
      'Inicio',
      'Experiencia',
      'Educación',
      'Habilidades',
    ]);
  });

  it('keeps the active link when the route carries query params', async () => {
    await router.navigate(['/projects'], { queryParams: { tech: 'NestJS' } });
    fixture.detectChanges();
    expect(activeLinks()).toEqual(['Experiencia']);

    await router.navigate(['/']);
    fixture.detectChanges();
    expect(activeLinks()).toEqual(['Inicio']);
  });

  it('toggles the theme through the service', () => {
    const service = TestBed.inject(ChangeSettingService);
    service.initTheme();
    const el = fixture.nativeElement as HTMLElement;
    (
      el.querySelector(
        '.nav-actions-desktop .theme-toggle',
      ) as HTMLButtonElement
    ).click();
    fixture.detectChanges();
    expect(service.getTheme()).toBe('light');
    expect(fixture.componentInstance.isDark()).toBe(false);
  });

  it('opens and closes the mobile menu', () => {
    const el = fixture.nativeElement as HTMLElement;
    const burger = el.querySelector('.hamburger') as HTMLButtonElement;
    burger.click();
    fixture.detectChanges();
    expect(burger.getAttribute('aria-expanded')).toBe('true');
    expect(el.querySelector('.nav-links.open')).toBeTruthy();

    (el.querySelector('.main-nav-link') as HTMLAnchorElement).click();
    fixture.detectChanges();
    expect(el.querySelector('.nav-links.open')).toBeNull();
  });
});
