import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzIconModule } from 'ng-zorro-antd/icon';

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
    NzButtonModule,
    NzListModule,
    NzIconModule,
    NzToolTipModule,
  ]
})
export class YogaSessionModule { }
