import {
  AfterContentInit,
  ContentChildren,
  Directive,
  Host,
  Input,
  OnDestroy,
  Optional,
  QueryList,
  TemplateRef,
  ViewContainerRef,
} from "@angular/core";
import { Subject } from "rxjs";
import { debounceTime, takeUntil } from "rxjs/operators";

@Directive({
  selector: "[appMatchCase]",
})
export class MatchCaseDirective {
  private matching: boolean = false;
  private rendered: boolean = false;

  @Input()
  set appMatchCase(result: any) {
    this.matching = !!result;
    this.appMatch.casesChanged();
  }

  constructor(
    private viewContainer: ViewContainerRef,
    private templateRef: TemplateRef<Object>,
    @Optional() @Host() private appMatch: MatchDirective
  ) {}

  get isMatching(): boolean {
    return this.matching;
  }

  render(): void {
    if (!this.rendered) {
      this.rendered = true;
      this.viewContainer.createEmbeddedView(this.templateRef);
    }
  }

  destroy(): void {
    if (this.rendered) {
      this.rendered = false;
      this.viewContainer.clear();
    }
  }
}

@Directive({
  selector: "[appMatch]",
})
export class MatchDirective implements AfterContentInit, OnDestroy {
  @ContentChildren(MatchCaseDirective)
  private cases?: QueryList<MatchCaseDirective>;

  private changes$: Subject<void> = new Subject();
  private destroyed$: Subject<void> = new Subject();

  constructor() {
    this.changes$
      .pipe(debounceTime(1), takeUntil(this.destroyed$))
      .subscribe(() => this.renderCases());
  }

  ngAfterContentInit(): void {
    this.cases!.changes.pipe(takeUntil(this.destroyed$)).subscribe(
      this.changes$
    );
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
  }

  casesChanged(): void {
    this.changes$.next();
  }

  private renderCases() {
    if (this.cases) {
      let found = false;
      this.cases.toArray().forEach((matchCase) => {
        if (matchCase.isMatching && !found) {
          found = true;
          matchCase.render();
        } else {
          matchCase.destroy();
        }
      });
    }
  }
}
