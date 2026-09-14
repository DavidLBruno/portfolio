import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
} from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import {
  provideClientHydration,
  withNoIncrementalHydration,
} from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideTransloco } from '@jsverse/transloco';
import { routes } from './app.routes';
import { TranslocoHttpLoader } from './transloco-loader';
import { environment } from '../environments/environment';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(
      routes,
      withInMemoryScrolling({ scrollPositionRestoration: 'top' }),
    ),
    provideClientHydration(withNoIncrementalHydration()),
    provideHttpClient(withFetch()),
    provideTransloco({
      config: {
        availableLangs: ['en', 'es'],
        defaultLang: 'es',
        fallbackLang: 'es',
        reRenderOnLangChange: true,
        prodMode: environment.production,
      },
      loader: TranslocoHttpLoader,
    }),
  ],
};
