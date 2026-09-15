import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, ViewTransitionInfo } from '@angular/router';
import { onRouteTransition } from './route-motion';

describe('route motion', () => {
  const snapshot = (path: string) =>
    ({ firstChild: { routeConfig: { path } } }) as ActivatedRouteSnapshot;

  function navigate(from: string, to: string) {
    const skipTransition = vi.fn();
    TestBed.runInInjectionContext(() =>
      onRouteTransition({
        from: snapshot(from),
        to: snapshot(to),
        transition: { skipTransition },
      } as unknown as ViewTransitionInfo),
    );
    return skipTransition;
  }

  beforeEach(() => {
    TestBed.configureTestingModule({});
    delete document.documentElement.dataset['routeDirection'];
    vi.stubGlobal('matchMedia', vi.fn().mockReturnValue({ matches: false }));
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    delete document.documentElement.dataset['routeDirection'];
  });

  it('follows the navbar order in both directions', () => {
    expect(navigate('', 'projects')).not.toHaveBeenCalled();
    expect(document.documentElement.dataset['routeDirection']).toBe('forward');
    navigate('tecnologies', 'about');
    expect(document.documentElement.dataset['routeDirection']).toBe('backward');
  });

  it('does not animate filter or fragment changes within the same section', () => {
    expect(navigate('projects', 'projects')).toHaveBeenCalledOnce();
    expect(document.documentElement.dataset['routeDirection']).toBeUndefined();
  });

  it('skips motion when the user prefers reduced motion', () => {
    vi.mocked(window.matchMedia).mockReturnValue({
      matches: true,
    } as MediaQueryList);
    expect(navigate('', 'projects')).toHaveBeenCalledOnce();
    expect(document.documentElement.dataset['routeDirection']).toBeUndefined();
  });
});
