import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, provideRouter } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { AboutComponent } from './about.component';
import { getTranslocoTestingModule } from '../../testing/transloco-testing';

describe('AboutComponent', () => {
  let fixture: ComponentFixture<AboutComponent>;
  let component: AboutComponent;
  let queryParams: BehaviorSubject<Record<string, string>>;

  beforeEach(async () => {
    queryParams = new BehaviorSubject<Record<string, string>>({});
    await TestBed.configureTestingModule({
      imports: [AboutComponent, getTranslocoTestingModule()],
      providers: [
        provideRouter([]),
        {
          provide: ActivatedRoute,
          useValue: { queryParams: queryParams.asObservable() },
        },
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(AboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('renders the education cards and hobbies translated', () => {
    const el = fixture.nativeElement as HTMLElement;
    expect(el.querySelectorAll('.education-card').length).toBe(6);
    expect(el.querySelectorAll('.hobby-card').length).toBe(4);
    expect(el.querySelector('.edu-period')?.textContent).toContain(
      'Abril 2025',
    );
    expect(el.querySelectorAll('.btn-certificate').length).toBe(4);
    expect(el.textContent).not.toMatch(/ABOUT\./);
  });

  it('highlights the matching education when filtering by tech', () => {
    queryParams.next({ tech: 'C#' });
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    expect(component.estudios()[0].key).toBe('ABOUT.EDUCATION.UAI');
    expect(el.querySelectorAll('.education-card').length).toBe(6);
    expect(el.querySelectorAll('.dimmed').length).toBe(0);
    expect(el.querySelectorAll('.tech-match').length).toBe(1);
  });
});
