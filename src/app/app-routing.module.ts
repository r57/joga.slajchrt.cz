import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { OwnReservationsComponent } from "./yoga-session/components/own-reservations/own-reservations.component";

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
    title: "Rezervace",
  },
  {
    path: "terminy/:id/rezervace",
    component: ReservationComponent,
    title: "Rezervace",
  },
  {
    path: "terminy/novy",
    component: SessionCreateComponent,
    title: "Nový termín",
  },
  {
    path: "terminy",
    component: YogaSessionComponent,
    title: "Termíny",
  },
  {
    path: "me-rezervace",
    component: OwnReservationsComponent,
    title: "Mé rezervace",
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
