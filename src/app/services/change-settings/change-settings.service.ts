import { Injectable } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';

@Injectable({
  providedIn: 'root',
})
export class ChangeSettingService {
  constructor(private translocoService: TranslocoService) {}

  change(value: string): void {
    localStorage.setItem('lan', value);
    const newValue = localStorage.getItem('lan');
    if (newValue) {
      this.translocoService.setActiveLang(newValue);
    }
  }

  setLanguage(): void {
    if (typeof window !== 'undefined') {
      const value = localStorage.getItem('lan');
      if (value) {
        this.translocoService.setActiveLang(value);
      }
    }
  }

  getLanguaje(): string {
    let value = '';
    if (typeof window !== 'undefined') {
      value = localStorage.getItem('lan') || 'en';
    }

    return value;
  }
}
