import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Store } from "@ngrx/store";
import { Observable, combineLatest } from "rxjs";
import { map } from "rxjs/operators";


import { YogaSession } from "../../yoga-session.model";
import * as YogaSessionSelectors from "../../store/yoga-session.selectors";


@Component({
  selector: "app-reservation-success",
  templateUrl: "./reservation-success.component.html",
  styleUrls: ["./reservation-success.component.scss"],
})
export class ReservationSuccessComponent {
  yogaSession$: Observable<YogaSession | undefined>;

  constructor(private store: Store, private route: ActivatedRoute) {
    this.yogaSession$ = combineLatest([
      store.select(YogaSessionSelectors.selectYogaSessions),
      route.paramMap,
    ]).pipe(
      map(([yogaSessions, params]) =>
        yogaSessions.find((s) => s.id === params.get("id"))
      )
    );
  }
}
