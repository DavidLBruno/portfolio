import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FooterComponent } from './footer.component';
import { getTranslocoTestingModule } from '../../testing/transloco-testing';
import { version } from '../../../../package.json';

describe('FooterComponent', () => {
  let fixture: ComponentFixture<FooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FooterComponent, getTranslocoTestingModule()],
    }).compileComponents();
    fixture = TestBed.createComponent(FooterComponent);
    fixture.detectChanges();
  });

  it('shows the current year and app version', () => {
    const el = fixture.nativeElement as HTMLElement;
    expect(el.querySelector('.footer-copyright')?.textContent).toContain(
      String(new Date().getFullYear()),
    );
    expect(el.querySelector('.footer-version')?.textContent).toBe(
      `v${version}`,
    );
  });

  it('has unique social links, each pointing to its own network', () => {
    const urls = fixture.componentInstance.socialLinks.map(l => l.url);
    expect(new Set(urls).size).toBe(urls.length);
    for (const link of fixture.componentInstance.socialLinks) {
      expect(link.url.toLowerCase()).toContain(link.label.toLowerCase());
    }
  });
});
