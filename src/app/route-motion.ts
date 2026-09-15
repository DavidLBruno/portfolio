import { DOCUMENT, inject } from '@angular/core';
import { ActivatedRouteSnapshot, ViewTransitionInfo } from '@angular/router';

// Keep direction consistent with the visual order of the main navigation.
const SECTION_ORDER = ['', 'projects', 'about', 'tecnologies'];

function sectionPath(route: ActivatedRouteSnapshot): string {
  let current = route;
  while (current.firstChild) current = current.firstChild;
  return current.routeConfig?.path ?? '';
}

export function onRouteTransition({
  from,
  to,
  transition,
}: ViewTransitionInfo): void {
  const document = inject(DOCUMENT);
  const source = sectionPath(from);
  const destination = sectionPath(to);
  if (
    source === destination ||
    document.defaultView?.matchMedia('(prefers-reduced-motion: reduce)').matches
  ) {
    transition.skipTransition();
    return;
  }

  document.documentElement.dataset['routeDirection'] =
    SECTION_ORDER.indexOf(destination) < SECTION_ORDER.indexOf(source)
      ? 'backward'
      : 'forward';

  // A subsequent navigation may start before this transition finishes.
  // Keep the direction until the next navigation instead of racing a cleanup.
}
