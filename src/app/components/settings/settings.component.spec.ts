import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SettingsComponent } from './settings.component';
import { ChangeSettingService } from '../../services/change-settings/change-settings.service';
import { getTranslocoTestingModule } from '../../testing/transloco-testing';

describe('SettingsComponent', () => {
  let fixture: ComponentFixture<SettingsComponent>;
  let service: ChangeSettingService;

  beforeEach(async () => {
    localStorage.clear();
    await TestBed.configureTestingModule({
      imports: [SettingsComponent, getTranslocoTestingModule()],
      providers: [
        {
          provide: NgbActiveModal,
          useValue: { close: vi.fn(), dismiss: vi.fn() },
        },
      ],
    }).compileComponents();
    service = TestBed.inject(ChangeSettingService);
    service.setLanguage();
    fixture = TestBed.createComponent(SettingsComponent);
    fixture.detectChanges();
  });

  it('shows the language and theme that are actually active', () => {
    const el = fixture.nativeElement as HTMLElement;
    const toggles = Array.from(el.querySelectorAll('.custom-dropdown')).map(b =>
      b.textContent?.trim(),
    );
    expect(toggles).toEqual(['Español', 'Oscuro']);
  });

  it('applies a language change and re-renders in the new language', () => {
    fixture.componentInstance.changeForm(
      { title: '', value: 'en' },
      'languaje',
    );
    fixture.detectChanges();
    expect(service.getLanguaje()).toBe('en');
    const el = fixture.nativeElement as HTMLElement;
    expect(el.querySelector('h1')?.textContent).toContain('Settings');
    expect(el.querySelector('.custom-dropdown')?.textContent).toContain(
      'English',
    );
  });

  it('applies a theme change', () => {
    fixture.componentInstance.changeForm(
      { title: '', value: 'light' },
      'theme',
    );
    expect(service.getTheme()).toBe('light');
    expect(document.body.classList.contains('theme-light')).toBe(true);
  });
});
