import { ApplicationRef, DOCUMENT } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { NavigationStart, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { PreferenceMotionService } from './preference-motion.service';

describe('PreferenceMotionService', () => {
  const events = new Subject<NavigationStart>();
  let service: PreferenceMotionService;
  let reduced: boolean;
  let start: ReturnType<typeof vi.fn>;
  let finish: () => void;

  beforeEach(() => {
    reduced = false;
    start = vi.fn((update: () => Promise<void>) => {
      const done = Promise.resolve().then(update);
      return {
        updateCallbackDone: done,
        ready: done,
        finished: new Promise<void>(resolve => {
          finish = resolve;
        }),
        skipTransition: vi.fn(),
      };
    });
    TestBed.configureTestingModule({
      providers: [
        {
          provide: DOCUMENT,
          useValue: {
            documentElement: document.documentElement,
            activeElement: null,
            defaultView: {
              innerWidth: 1200,
              innerHeight: 800,
              matchMedia: () => ({ matches: reduced }),
            },
            startViewTransition: start,
          },
        },
        { provide: Router, useValue: { events } },
        ],
    });
    vi.spyOn(TestBed.inject(ApplicationRef), 'tick').mockImplementation(() => undefined);
    service = TestBed.inject(PreferenceMotionService);
  });

  afterEach(() => {
    vi.restoreAllMocks();
    document.documentElement.removeAttribute('data-preference-motion');
    ['--reveal-x', '--reveal-y', '--reveal-radius'].forEach(name =>
      document.documentElement.style.removeProperty(name),
    );
  });

  it('applies preferences immediately for reduced motion', () => {
    reduced = true;
    const update = vi.fn();
    service.run('theme', update);
    expect(update).toHaveBeenCalledOnce();
    expect(start).not.toHaveBeenCalled();
  });

  it('waits for asynchronous text updates and cleans up the effect', async () => {
    let complete!: () => void;
    service.run(
      'language',
      () =>
        new Promise<void>(resolve => {
          complete = resolve;
        }),
    );
    await vi.waitFor(() => expect(start).toHaveBeenCalledOnce());
    expect(document.documentElement.dataset['preferenceMotion']).toBe(
      'language',
    );
    expect(TestBed.inject(ApplicationRef).tick).not.toHaveBeenCalled();
    complete();
    await vi.waitFor(() =>
      expect(TestBed.inject(ApplicationRef).tick).toHaveBeenCalledOnce(),
    );
    finish();
    await vi.waitFor(() =>
      expect(
        document.documentElement.hasAttribute('data-preference-motion'),
      ).toBe(false),
    );
  });

  it('preserves the order of rapid preference changes', async () => {
    const updates: string[] = [];
    service.run('theme', () => {
      updates.push('light');
    });
    service.run('theme', () => {
      updates.push('dark');
    });
    await vi.waitFor(() => expect(updates).toEqual(['light', 'dark']));
    expect(start).toHaveBeenCalledTimes(2);
    finish();
  });

  it('lets navigation cancel the effect without losing a pending preference', async () => {
    const update = vi.fn();
    service.run('theme', update);
    events.next(new NavigationStart(1, '/projects'));
    await vi.waitFor(() => expect(update).toHaveBeenCalledOnce());
    expect(start).not.toHaveBeenCalled();
  });
});
