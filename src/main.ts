import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

import { Settings } from 'luxon';

Settings.defaultLocale = 'cs';

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
