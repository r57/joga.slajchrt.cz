import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { YogaSessionRoutingModule } from './yoga-session-routing.module';
import { YogaSessionComponent } from './yoga-session.component';

@NgModule({
  declarations: [
    YogaSessionComponent
  ],
  imports: [
    CommonModule,
    YogaSessionRoutingModule,
  ]
})
export class YogaSessionModule { }
