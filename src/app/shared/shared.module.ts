import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LuxonDateMediumPipe } from "./luxon-date-medium.pipe";
import { MatchCaseDirective, MatchDirective } from "./match.directive";

@NgModule({
  declarations: [LuxonDateMediumPipe, MatchDirective, MatchCaseDirective],
  imports: [CommonModule],
  exports: [LuxonDateMediumPipe, MatchDirective, MatchCaseDirective],
})
export class SharedModule {}
