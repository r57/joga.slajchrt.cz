import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import cs from '@angular/common/locales/cs';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { registerLocaleData } from '@angular/common';

import { AngularFireModule } from '@angular/fire/compat';
import { ScreenTrackingService, UserTrackingService } from '@angular/fire/analytics';

import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';

import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { cs_CZ } from 'ng-zorro-antd/i18n';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';

import * as AppReducer from './store/app.reducer';
import { AppEffects } from './store/app.effects';

import { HomeComponent } from './home/home.component';
import { YogaSessionModule } from './yoga-session/yoga-session.module';

registerLocaleData(cs);

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    StoreModule.forRoot({}, {}),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
    EffectsModule.forRoot([]),
    StoreModule.forFeature(AppReducer.appFeatureKey, AppReducer.reducer),
    EffectsModule.forFeature([AppEffects]),
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NzLayoutModule,
    NzMenuModule,
    NzIconModule,
    NzButtonModule,
    YogaSessionModule,
  ],
  providers: [
    ScreenTrackingService, UserTrackingService, { provide: NZ_I18N, useValue: cs_CZ }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
