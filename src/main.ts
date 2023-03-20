import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import { Settings } from "luxon";

import * as Sentry from "@sentry/angular-ivy";
import { BrowserTracing } from "@sentry/tracing";

import { environment } from "./environments/environment";

import { AppModule } from "./app/app.module";

import { commitSHA } from "../.commit";

if (environment.sentry.enabled) {
  Sentry.init({
    release: commitSHA,
    dsn: environment.sentry.dsn,
    integrations: [
      new BrowserTracing({
        tracePropagationTargets: ["localhost", "https://joga.slajchrt.cz"],
        routingInstrumentation: Sentry.routingInstrumentation,
      }),
    ],
    tracesSampleRate: environment.sentry.sampleRate,
  });
}

Settings.defaultLocale = "cs";

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err));
