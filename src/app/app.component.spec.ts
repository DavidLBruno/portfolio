import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app.component';
import { getTranslocoTestingModule } from './testing/transloco-testing';

describe('AppComponent', () => {
  beforeEach(async () => {
    localStorage.clear();
    await TestBed.configureTestingModule({
      imports: [AppComponent, getTranslocoTestingModule()],
      providers: [provideRouter([])],
    }).compileComponents();
  });

  it('creates the app with navbar, outlet and footer', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    expect(el.querySelector('app-navbar')).toBeTruthy();
    expect(el.querySelector('router-outlet')).toBeTruthy();
    expect(el.querySelector('app-footer')).toBeTruthy();
  });

  it('applies the saved theme on startup', () => {
    localStorage.setItem('theme', 'light');
    TestBed.createComponent(AppComponent);
    expect(document.body.classList.contains('theme-light')).toBe(true);
  });
});
