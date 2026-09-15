import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router, provideRouter } from '@angular/router';
import { TecnologiesComponent } from './tecnologies.component';
import { getTranslocoTestingModule } from '../../testing/transloco-testing';

describe('TecnologiesComponent', () => {
  let fixture: ComponentFixture<TecnologiesComponent>;
  let component: TecnologiesComponent;
  let navigate: ReturnType<typeof vi.spyOn>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TecnologiesComponent, getTranslocoTestingModule()],
      providers: [provideRouter([])],
    }).compileComponents();
    fixture = TestBed.createComponent(TecnologiesComponent);
    component = fixture.componentInstance;
    navigate = vi
      .spyOn(TestBed.inject(Router), 'navigate')
      .mockResolvedValue(true);
    fixture.detectChanges();
  });

  it('renders every category as a translated heading with clickable tags', () => {
    const el = fixture.nativeElement as HTMLElement;
    expect(el.querySelectorAll('.skill-category').length).toBe(
      component.tecnologies.length,
    );
    expect(el.querySelector('.category-title')?.textContent).toContain(
      'Lenguajes',
    );
    expect(el.querySelectorAll('button.skill-tag').length).toBe(
      component.tecnologies.reduce((n, c) => n + c.items.length, 0),
    );
  });

  it('sends work-related techs to the experience page', () => {
    component.filterExperience('NestJS');
    expect(navigate).toHaveBeenCalledWith(['/projects'], {
      queryParams: { tech: 'NestJS' },
    });
  });

  it('sends education-only techs to the about page', () => {
    component.filterExperience('C#');
    expect(navigate).toHaveBeenCalledWith(['/about'], {
      queryParams: { tech: 'C#' },
    });
  });
});
