import { Injectable } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChangeSettingService {
  private themeSubject = new BehaviorSubject<string>('dark');
  theme$ = this.themeSubject.asObservable();

  constructor(private translocoService: TranslocoService) {}

  // ---- Language ----
  change(value: string): void {
    localStorage.setItem('lan', value);
    const newValue = localStorage.getItem('lan');
    if (newValue) {
      this.translocoService.setActiveLang(newValue);
    }
  }

  setLanguage(): void {
    if (typeof window !== 'undefined') {
      const value = localStorage.getItem('lan') || 'es';
      this.translocoService.setActiveLang(value);
    }
  }

  getLanguaje(): string {
    let value = '';
    if (typeof window !== 'undefined') {
      value = localStorage.getItem('lan') || 'en';
    }
    return value;
  }

  // ---- Theme ----
  initTheme(): void {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme') || 'dark';
      this.applyTheme(saved);
    }
  }

  toggleTheme(): void {
    const current = this.themeSubject.value;
    const next = current === 'dark' ? 'light' : 'dark';
    this.applyTheme(next);
  }

  setTheme(theme: string): void {
    this.applyTheme(theme);
  }

  getTheme(): string {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') || 'dark';
    }
    return 'dark';
  }

  private applyTheme(theme: string): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem('theme', theme);
      document.body.classList.remove('theme-dark', 'theme-light');
      document.body.classList.add(`theme-${theme}`);
      this.themeSubject.next(theme);
    }
  }
}
