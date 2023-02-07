import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { YogaSessionComponent } from './yoga-session.component';

const routes: Routes = [{ path: '', component: YogaSessionComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class YogaSessionRoutingModule { }
