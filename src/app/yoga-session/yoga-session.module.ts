import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";

import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";

import { NzAlertModule } from "ng-zorro-antd/alert";
import { NzButtonModule } from "ng-zorro-antd/button";
import { NzDescriptionsModule } from "ng-zorro-antd/descriptions";
import { NzFormModule } from "ng-zorro-antd/form";
import { NzIconModule } from "ng-zorro-antd/icon";
import { NzListModule } from "ng-zorro-antd/list";
import { NzResultModule } from 'ng-zorro-antd/result';
import { NzProgressModule } from "ng-zorro-antd/progress";
import { NzSpinModule } from "ng-zorro-antd/spin";
import { NzToolTipModule } from "ng-zorro-antd/tooltip";

import { YogaSessionComponent } from "./yoga-session.component";
import { ReservationComponent } from "./components/reservation/reservation.component";

import * as YogaSessionReducer from "./store/yoga-session.reducer";
import { YogaSessionEffects } from "./store/yoga-session.effects";
import { SharedModule } from "../shared/shared.module";
import {
  IsSessionHistoryPipe,
  IsSessionLockoutPipe,
  SessionAtCapacityPipe,
} from "./yoga-session.pipe";
import { ReservationSuccessComponent } from './components/reservation-success/reservation-success.component';

@NgModule({
  declarations: [
    YogaSessionComponent,
    ReservationComponent,
    SessionAtCapacityPipe,
    IsSessionLockoutPipe,
    IsSessionHistoryPipe,
    ReservationSuccessComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    StoreModule.forFeature(
      YogaSessionReducer.eventFeatureKey,
      YogaSessionReducer.reducer
    ),
    EffectsModule.forFeature([YogaSessionEffects]),
    NzAlertModule,
    NzButtonModule,
    NzDescriptionsModule,
    NzFormModule,
    NzIconModule,
    NzListModule,
    NzProgressModule,
    NzResultModule,
    NzSpinModule,
    NzToolTipModule,
    ReactiveFormsModule,
    SharedModule,
  ],
})
export class YogaSessionModule {}
