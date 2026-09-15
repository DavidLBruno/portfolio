import { ApplicationRef, DOCUMENT, Injectable, inject } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

type PreferenceEffect = 'theme' | 'language';

@Injectable({ providedIn: 'root' })
export class PreferenceMotionService {
  private readonly document = inject(DOCUMENT);
  private readonly app = inject(ApplicationRef);
  private active?: ViewTransition;
  private updates: Promise<unknown> = Promise.resolve();
  private navigationVersion = 0;

  constructor() {
    inject(Router)
      .events.pipe(takeUntilDestroyed())
      .subscribe(event => {
        if (event instanceof NavigationStart) {
          this.navigationVersion++;
          this.active?.skipTransition();
          this.document.documentElement.removeAttribute(
            'data-preference-motion',
          );
        }
      });
  }

  run(
    effect: PreferenceEffect,
    update: () => void | Promise<void>,
    event?: Event,
  ): void {
    const doc = this.document;
    const win = doc.defaultView;
    if (
      !win ||
      !doc.startViewTransition ||
      win.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      void update();
      return;
    }

    const target = (event?.currentTarget ??
      doc.activeElement) as HTMLElement | null;
    const rect =
      target?.closest('label, button')?.getBoundingClientRect() ??
      target?.getBoundingClientRect();
    const x = rect ? rect.left + rect.width / 2 : win.innerWidth / 2;
    const y = rect ? rect.top + rect.height / 2 : win.innerHeight / 2;
    const radius = Math.hypot(
      Math.max(x, win.innerWidth - x),
      Math.max(y, win.innerHeight - y),
    );

    this.active?.skipTransition();
    const navigationVersion = this.navigationVersion;
    // Finish each DOM update before the next one; rapid choices must not be lost.
    this.updates = this.updates
      .catch(() => undefined)
      .then(() => {
        if (navigationVersion !== this.navigationVersion) return update();
        this.active?.skipTransition();
        doc.documentElement.dataset['preferenceMotion'] = effect;
        doc.documentElement.style.setProperty('--reveal-x', `${x}px`);
        doc.documentElement.style.setProperty('--reveal-y', `${y}px`);
        doc.documentElement.style.setProperty('--reveal-radius', `${radius}px`);
        const transition = doc.startViewTransition(async () => {
          await update();
          this.app.tick();
        });
        this.active = transition;
        const cleanup = () => {
          if (this.active === transition) {
            this.active = undefined;
            doc.documentElement.removeAttribute('data-preference-motion');
          }
        };
        void transition.ready.catch(() => undefined);
        void transition.finished.then(cleanup, cleanup);
        return transition.updateCallbackDone;
      })
      .catch(() => undefined);
  }
}
