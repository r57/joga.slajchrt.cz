import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { ReservationSuccessComponent } from "./yoga-session/components/reservation-success/reservation-success.component";
import { ReservationComponent } from "./yoga-session/components/reservation/reservation.component";
import { SessionAdminComponent } from "./yoga-session/components/session-admin/session-admin.component";
import { SessionCreateComponent } from "./yoga-session/components/session-create/session-create.component";
import { YogaSessionComponent } from "./yoga-session/yoga-session.component";

const routes: Routes = [
  {
    path: "terminy/:id/admin",
    component: SessionAdminComponent,
    title: "Správa termínu",
  },
  {
    path: "terminy/:id/rezervace/rezervovano",
    component: ReservationSuccessComponent,
    title: "Termíny",
  },
  {
    path: "terminy/:id/rezervace",
    component: ReservationComponent,
    title: "Rezervace",
  },
  {
    path: "terminy/novy",
    component: SessionCreateComponent,
    title: "Termíny",
  },
  {
    path: "terminy",
    component: YogaSessionComponent,
    title: "Termíny",
  },
  {
    path: "**",
    redirectTo: "/terminy",
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
