import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { YogaSessionComponent } from './yoga-session/yoga-session.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'terminy', component: YogaSessionComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
