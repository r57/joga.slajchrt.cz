import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { HomeComponent } from "./home/home.component";
import { ReservationSuccessComponent } from "./yoga-session/components/reservation-success/reservation-success.component";
import { ReservationComponent } from "./yoga-session/components/reservation/reservation.component";
import { YogaSessionComponent } from "./yoga-session/yoga-session.component";

const routes: Routes = [
  { path: "", component: HomeComponent },
  {
    path: "terminy/:id/rezervace/rezervovano",
    component: ReservationSuccessComponent,
  },
  { path: "terminy/:id/rezervace", component: ReservationComponent },
  { path: "terminy", component: YogaSessionComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
