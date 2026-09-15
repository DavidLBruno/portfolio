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
    const selected = Array.from(
      el.querySelectorAll<HTMLInputElement>('input:checked'),
    ).map(input => input.value);
    expect(selected).toEqual(['es', 'dark']);
  });

  it('applies a language change and re-renders in the new language', () => {
    const english = fixture.nativeElement.querySelector(
      'input[value="en"]',
    ) as HTMLInputElement;
    english.click();
    fixture.detectChanges();
    expect(service.getLanguaje()).toBe('en');
    const el = fixture.nativeElement as HTMLElement;
    expect(el.querySelector('h2')?.textContent).toContain('Preferences');
    expect(el.querySelector('.setting-option.selected')?.textContent).toContain(
      'English',
    );
  });

  it('applies a theme change', () => {
    const light = fixture.nativeElement.querySelector(
      'input[value="light"]',
    ) as HTMLInputElement;
    light.click();
    fixture.detectChanges();
    expect(light.checked).toBe(true);
    expect(service.getTheme()).toBe('light');
    expect(document.body.classList.contains('theme-light')).toBe(true);
  });
});
