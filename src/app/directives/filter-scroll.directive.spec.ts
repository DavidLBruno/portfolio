import { By } from '@angular/platform-browser';
import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { NavigationEnd, Router, Scroll } from '@angular/router';
import { Subject } from 'rxjs';
import { FilterScrollDirective } from './filter-scroll.directive';

@Component({
  imports: [FilterScrollDirective],
  template: `<section>
    <div appFilterScroll style="top:104px"></div>
    <div class="timeline-item"></div>
    <div class="project-card skill-match"></div>
  </section>`,
})
class TestPage {}

describe('FilterScrollDirective', () => {
  it('announces the descent before animating and lets the user interrupt it', () => {
    vi.useFakeTimers();
    vi.spyOn(document.documentElement, 'scrollHeight', 'get').mockReturnValue(4000);
    vi.stubGlobal('matchMedia', vi.fn(() => ({ matches: false })));
    const events = new Subject<unknown>();
    TestBed.configureTestingModule({
      imports: [TestPage],
      providers: [{ provide: Router, useValue: { events } }],
    });
    const fixture = TestBed.createComponent(TestPage);
    fixture.detectChanges();
    const scroll = vi.spyOn(window, 'scrollTo').mockImplementation(() => {});
    let callback: FrameRequestCallback = () => {};
    vi.spyOn(window, 'requestAnimationFrame').mockImplementation(fn => {
      callback = fn;
      return 1;
    });
    const banner = fixture.nativeElement.querySelector('[appFilterScroll]');
    const match = fixture.nativeElement.querySelector('.project-card');
    vi.spyOn(banner, 'getBoundingClientRect').mockReturnValue({ height: 80 });
    vi.spyOn(match, 'getBoundingClientRect').mockReturnValue({ top: 600 });
    const end = new NavigationEnd(1, '/projects?tech=React', '/projects?tech=React');
    events.next(end);
    expect(scroll).not.toHaveBeenCalled();
    events.next(new Scroll(end, null, null));
    expect(scroll).not.toHaveBeenCalled();
    const directive = fixture.debugElement.query(By.directive(FilterScrollDirective)).injector.get(FilterScrollDirective);
    vi.advanceTimersByTime(650);
    expect(directive.phase()).toBe('pending');
    expect(scroll).not.toHaveBeenCalled();
    vi.advanceTimersByTime(250);
    callback(0);
    expect(scroll).toHaveBeenLastCalledWith({ top: 0, behavior: 'instant' });
    callback(365);
    expect(scroll).toHaveBeenLastCalledWith({ top: 200, behavior: 'instant' });
    callback(730);
    expect(scroll).toHaveBeenLastCalledWith({ top: 400, behavior: 'instant' });
    expect(directive.phase()).toBe('arrived');
    scroll.mockClear();
    events.next(new Scroll(end, null, null));
    vi.advanceTimersByTime(650);
    window.dispatchEvent(new Event('wheel'));
    vi.advanceTimersByTime(250);
    expect(directive.phase()).toBe('idle');
    expect(scroll).not.toHaveBeenCalled();
    fixture.destroy();
    vi.restoreAllMocks();
    vi.useRealTimers();
    vi.unstubAllGlobals();
  });
});

