import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { YogaSessionComponent } from './yoga-session/yoga-session.component';

const routes: Routes = [
  { path: 'yoga-session', component: YogaSessionComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
