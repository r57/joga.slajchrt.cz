import { NgModule, isDevMode, ErrorHandler, Provider } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { TitleStrategy } from "@angular/router";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import cs from "@angular/common/locales/cs";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { registerLocaleData } from "@angular/common";

import { AngularFireModule } from "@angular/fire/compat";
import {
  AngularFireRemoteConfigModule,
  SETTINGS as AngularFireRemoteConfigSettings,
} from "@angular/fire/compat/remote-config";
import {
  ScreenTrackingService,
  UserTrackingService,
} from "@angular/fire/analytics";

import * as Sentry from "@sentry/angular-ivy";

import { StoreModule } from "@ngrx/store";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { EffectsModule } from "@ngrx/effects";

import { NZ_I18N } from "ng-zorro-antd/i18n";
import { cs_CZ } from "ng-zorro-antd/i18n";

import { NzButtonModule } from "ng-zorro-antd/button";
import { NzIconModule } from "ng-zorro-antd/icon";
import { NzLayoutModule } from "ng-zorro-antd/layout";
import { NzMenuModule } from "ng-zorro-antd/menu";
import { NzSpinModule } from "ng-zorro-antd/spin";

import { environment } from "../environments/environment";

import { AppRoutingModule } from "./app-routing.module";
import { SharedModule } from "./shared/shared.module";

import * as AppReducer from "./store/app.reducer";
import { AppEffects } from "./store/app.effects";

import { AppComponent } from "./app.component";
import { YogaSessionModule } from "./yoga-session/yoga-session.module";
import { TemplatePageTitleStrategy } from "./title.strategy";
import { FirestoreService } from "./firebase/firestore.service";
import { PhoneAuthService } from "./firebase/phoneauth.service";
import { RemoteConfigService } from "./firebase/remoteconfig.service";
import { LocalStorageService } from "./localstorage.service";

registerLocaleData(cs);

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireRemoteConfigModule,
    StoreModule.forRoot({}, {}),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
    EffectsModule.forRoot([]),
    StoreModule.forFeature(AppReducer.appFeatureKey, AppReducer.reducer),
    EffectsModule.forFeature([AppEffects]),
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NzButtonModule,
    NzIconModule,
    NzLayoutModule,
    NzMenuModule,
    NzSpinModule,
    YogaSessionModule,
    SharedModule,
  ],
  providers: [
    FirestoreService,
    PhoneAuthService,
    RemoteConfigService,
    ScreenTrackingService,
    UserTrackingService,
    LocalStorageService,
    { provide: NZ_I18N, useValue: cs_CZ },
    {
      provide: TitleStrategy,
      useClass: TemplatePageTitleStrategy,
    },
    {
      provide: AngularFireRemoteConfigSettings,
      useFactory: () =>
        isDevMode() ? { minimumFetchIntervalMillis: 10000 } : {},
    },
    ...(environment.sentry.enabled
      ? [
          {
            provide: ErrorHandler,
            useValue: Sentry.createErrorHandler({
              showDialog: false,
              logErrors: true,
            }),
          },
        ]
      : []),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
