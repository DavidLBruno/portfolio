import { Directive, DestroyRef, ElementRef, HostListener, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationStart, Router, Scroll } from '@angular/router';

/** Present the destination, announce the descent, then animate to the match. */
@Directive({ selector: '[appFilterScroll]', exportAs: 'filterScroll' })
export class FilterScrollDirective {
  private host = inject<ElementRef<HTMLElement>>(ElementRef);
  private frame?: number;
  private timer?: ReturnType<typeof setTimeout>;
  readonly phase = signal<'idle' | 'pending' | 'moving' | 'arrived'>('idle');

  constructor() {
    inject(Router).events.pipe(takeUntilDestroyed()).subscribe(event => {
      if (typeof window === 'undefined') return;
      if (event instanceof NavigationStart) this.cancel();
      if (!(event instanceof Scroll)) return;
      this.cancel();
      // Let the route entrance finish before announcing any scroll.
      this.timer = setTimeout(() => {
        if (this.destination() <= window.scrollY + 80) return;
        this.phase.set('pending');
        this.timer = setTimeout(() => this.descend(), 250);
      }, 650);
    });
    inject(DestroyRef).onDestroy(() => this.cancel());
  }

  private destination(): number {
    const banner = this.host.nativeElement;
    const target = banner.closest('section')?.querySelector<HTMLElement>(
      '.skill-match',
    );
    if (!target) return window.scrollY;
    const top = Number.parseFloat(window.getComputedStyle(banner).top) || 104;
    return Math.max(0, Math.min(
      window.scrollY + target.getBoundingClientRect().top
        - top - banner.getBoundingClientRect().height - 16,
      document.documentElement.scrollHeight - window.innerHeight,
    ));
  }

  private descend() {
    const start = window.scrollY;
    const end = this.destination();
    if (end <= start + 16) {
      this.phase.set('idle');
      return;
    }
    this.phase.set('moving');
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      window.scrollTo({ top: end, behavior: 'instant' });
      this.phase.set('arrived');
      return;
    }
    const duration = Math.min(1200, 650 + (end - start) * 0.2);
    let started: number | undefined;
    const step = (now: number) => {
      started ??= now;
      const progress = Math.min(1, (now - started) / duration);
      // Quintic easing has zero velocity and acceleration at both ends.
      const eased = progress ** 3 * (progress * (progress * 6 - 15) + 10);
      window.scrollTo({ top: start + (end - start) * eased, behavior: 'instant' });
      if (progress < 1) this.frame = window.requestAnimationFrame(step);
      else this.phase.set('arrived');
    };
    this.frame = window.requestAnimationFrame(step);
  }

  @HostListener('window:wheel')
  @HostListener('window:touchstart')
  @HostListener('window:pointerdown')
  cancel() {
    clearTimeout(this.timer);
    if (this.frame !== undefined) window.cancelAnimationFrame(this.frame);
    this.phase.set('idle');
  }

  @HostListener('window:keydown', ['$event'])
  onKey(event: KeyboardEvent) {
    if (['ArrowDown', 'ArrowUp', 'PageDown', 'PageUp', 'Home', 'End', ' ', 'Escape', 'Tab'].includes(event.key)) {
      this.cancel();
    }
  }
}
