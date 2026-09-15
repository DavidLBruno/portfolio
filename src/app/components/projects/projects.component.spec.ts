import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router, provideRouter } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { ProjectsComponent } from './projects.component';
import { getTranslocoTestingModule } from '../../testing/transloco-testing';

describe('ProjectsComponent', () => {
  let fixture: ComponentFixture<ProjectsComponent>;
  let component: ProjectsComponent;
  let queryParams: BehaviorSubject<Record<string, string>>;

  beforeEach(async () => {
    queryParams = new BehaviorSubject<Record<string, string>>({});
    await TestBed.configureTestingModule({
      imports: [ProjectsComponent, getTranslocoTestingModule()],
      providers: [
        provideRouter([]),
        {
          provide: ActivatedRoute,
          useValue: { queryParams: queryParams.asObservable() },
        },
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(ProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('renders every job and project with translated text', () => {
    const el = fixture.nativeElement as HTMLElement;
    expect(el.querySelectorAll('.timeline-item').length).toBe(2);
    expect(el.querySelectorAll('.project-card').length).toBe(6);
    expect(el.querySelector('.job-title')?.textContent).toContain(
      'Full Stack Developer',
    );
    expect(el.querySelector('.current-badge')?.textContent).toContain('Actual');
    expect(el.querySelectorAll('.job-responsibilities li').length).toBe(7);
    expect(el.textContent).not.toMatch(/EXPERIENCE\.|PROJECTS\./);
  });

  it('keeps all cards in their original order when a skill is selected', () => {
    const original = component.projects().map(p => p.key);
    queryParams.next({ tech: 'nestjs' });
    fixture.detectChanges();

    expect(component.selectedTech()).toBe('nestjs');
    const projects = component.projects();
    const matches = projects.filter(p => component.hasTechProject(p));
    expect(matches.length).toBe(2);
    expect(projects.map(p => p.key)).toEqual(original);

    const el = fixture.nativeElement as HTMLElement;
    expect(el.querySelector('.filter-banner')?.textContent).toContain('nestjs');
    expect(el.querySelectorAll('.project-card').length).toBe(6);
    expect(el.querySelectorAll('.dimmed').length).toBe(0);
    expect(el.querySelector('.filter-banner')?.textContent?.trim()).toBe('nestjs');
    expect(el.querySelectorAll('.tech-match').length).toBeGreaterThan(0);
  });

  it('preserves earlier experience when JasperSoft is selected', () => {
    queryParams.next({ tech: 'JasperSoft' });
    fixture.detectChanges();
    expect(component.workExperience().map(job => job.key)).toEqual([
      'EXPERIENCE.JOBS.THELABIT', 'EXPERIENCE.JOBS.DEPSYS',
    ]);
    const cards = fixture.nativeElement.querySelectorAll('.timeline-item');
    expect(cards.length).toBe(2);
    expect(cards[0].classList.contains('skill-match')).toBe(false);
    expect(cards[1].classList.contains('skill-match')).toBe(true);
    expect(fixture.nativeElement.querySelector('.dimmed')).toBeNull();
  });

  it('matches jobs through their sub-projects', () => {
    queryParams.next({ tech: 'Prisma' });
    fixture.detectChanges();
    const [thelabit, depsys] = component.workExperience();
    expect(component.hasTechJob(thelabit)).toBe(true);
    expect(component.hasTechJob(depsys)).toBe(false);
  });

  it('restores the original order when the filter is cleared', () => {
    const original = component.projects().map(p => p.key);
    queryParams.next({ tech: 'NestJS' });
    fixture.detectChanges();
    queryParams.next({});
    fixture.detectChanges();
    expect(component.projects().map(p => p.key)).toEqual(original);
    expect(component.selectedTech()).toBeNull();
  });

  it('navigates to /projects without params on clear', () => {
    const router = TestBed.inject(Router);
    const spy = vi.spyOn(router, 'navigate').mockResolvedValue(true);
    component.clearFilter();
    expect(spy).toHaveBeenCalledWith(['/projects']);
  });
});
