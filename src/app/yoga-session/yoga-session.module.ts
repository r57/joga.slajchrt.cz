import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { YogaSessionRoutingModule } from './yoga-session-routing.module';
import { YogaSessionComponent } from './yoga-session.component';

import * as YogaSessionReducer from './store/yoga-session.reducer';
import { YogaSessionEffects } from './store/yoga-session.effects';

@NgModule({
  declarations: [
    YogaSessionComponent
  ],
  imports: [
    CommonModule,
    YogaSessionRoutingModule,
    StoreModule.forFeature(YogaSessionReducer.eventFeatureKey, YogaSessionReducer.reducer),
    EffectsModule.forFeature([YogaSessionEffects]),
  ]
})
export class YogaSessionModule { }
