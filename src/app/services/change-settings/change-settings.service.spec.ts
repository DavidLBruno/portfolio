import { TestBed } from '@angular/core/testing';
import { TranslocoService } from '@jsverse/transloco';
import { ChangeSettingService } from './change-settings.service';
import { getTranslocoTestingModule } from '../../testing/transloco-testing';

describe('ChangeSettingService', () => {
  let service: ChangeSettingService;
  let transloco: TranslocoService;

  beforeEach(() => {
    localStorage.clear();
    document.body.className = '';
    TestBed.configureTestingModule({ imports: [getTranslocoTestingModule()] });
    service = TestBed.inject(ChangeSettingService);
    transloco = TestBed.inject(TranslocoService);
  });

  it('defaults to Spanish when nothing is stored', () => {
    expect(service.getLanguaje()).toBe('es');
    service.setLanguage();
    expect(transloco.getActiveLang()).toBe('es');
    expect(document.documentElement.lang).toBe('es');
  });

  it('persists and applies a language change', () => {
    service.change('en');
    expect(localStorage.getItem('lan')).toBe('en');
    expect(transloco.getActiveLang()).toBe('en');
    expect(service.getLanguaje()).toBe('en');
  });

  it('falls back to Spanish for unknown languages', () => {
    service.change('fr');
    expect(service.getLanguaje()).toBe('es');
  });

  it('defaults to the dark theme and toggles', () => {
    service.initTheme();
    expect(document.body.classList.contains('theme-dark')).toBe(true);

    service.toggleTheme();
    expect(document.body.classList.contains('theme-light')).toBe(true);
    expect(document.body.classList.contains('theme-dark')).toBe(false);
    expect(localStorage.getItem('theme')).toBe('light');
    expect(service.getTheme()).toBe('light');
  });

  it('emits the current theme', () => {
    const seen: string[] = [];
    service.theme$.subscribe(t => seen.push(t));
    service.setTheme('light');
    service.setTheme('dark');
    expect(seen).toEqual(['dark', 'light', 'dark']);
  });
});
