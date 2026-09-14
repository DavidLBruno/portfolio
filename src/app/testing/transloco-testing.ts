import {
  TranslocoTestingModule,
  TranslocoTestingOptions,
} from '@jsverse/transloco';
import es from '../../assets/i18n/es.json';
import en from '../../assets/i18n/en.json';

/** Transloco configured with the real translation files, no HTTP. */
export function getTranslocoTestingModule(
  options: TranslocoTestingOptions = {},
) {
  return TranslocoTestingModule.forRoot({
    langs: { es, en },
    translocoConfig: {
      availableLangs: ['es', 'en'],
      defaultLang: 'es',
      reRenderOnLangChange: true,
    },
    preloadLangs: true,
    ...options,
  });
}
