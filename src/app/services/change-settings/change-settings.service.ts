import { Injectable, inject } from '@angular/core';
import { TranslocoService } from '@jsverse/transloco';
import { BehaviorSubject } from 'rxjs';

export type Theme = 'dark' | 'light';
export type Lang = 'es' | 'en';

const DEFAULT_LANG: Lang = 'es';
const DEFAULT_THEME: Theme = 'dark';

@Injectable({
  providedIn: 'root',
})
export class ChangeSettingService {
  private translocoService = inject(TranslocoService);

  private themeSubject = new BehaviorSubject<Theme>(DEFAULT_THEME);
  theme$ = this.themeSubject.asObservable();

  private get storage(): Storage | null {
    try {
      return typeof window !== 'undefined' ? window.localStorage : null;
    } catch {
      // Storage can throw in private mode / blocked cookies
      return null;
    }
  }

  // ---- Language ----
  change(value: string): void {
    const lang = this.normalizeLang(value);
    this.storage?.setItem('lan', lang);
    this.translocoService.setActiveLang(lang);
    this.setDocumentLang(lang);
  }

  setLanguage(): void {
    const lang = this.getLanguaje();
    this.translocoService.setActiveLang(lang);
    this.setDocumentLang(lang);
  }

  getLanguaje(): Lang {
    return this.normalizeLang(this.storage?.getItem('lan'));
  }

  // ---- Theme ----
  initTheme(): void {
    this.applyTheme(this.getTheme());
  }

  toggleTheme(): void {
    this.applyTheme(this.themeSubject.value === 'dark' ? 'light' : 'dark');
  }

  setTheme(theme: string): void {
    this.applyTheme(this.normalizeTheme(theme));
  }

  getTheme(): Theme {
    return this.normalizeTheme(this.storage?.getItem('theme'));
  }

  private applyTheme(theme: Theme): void {
    this.storage?.setItem('theme', theme);
    if (typeof document !== 'undefined') {
      document.body.classList.remove('theme-dark', 'theme-light');
      document.body.classList.add(`theme-${theme}`);
      document
        .querySelector('meta[name="theme-color"]')
        ?.setAttribute('content', theme === 'dark' ? '#0a0a0f' : '#f8fafc');
    }
    this.themeSubject.next(theme);
  }

  private setDocumentLang(lang: Lang): void {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = lang;
    }
  }

  private normalizeLang(value: string | null | undefined): Lang {
    return value === 'en' ? 'en' : DEFAULT_LANG;
  }

  private normalizeTheme(value: string | null | undefined): Theme {
    return value === 'light' ? 'light' : DEFAULT_THEME;
  }
}
