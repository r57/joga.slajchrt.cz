import { Pipe, PipeTransform } from "@angular/core";
import {
  isSessionAfterLockout,
  isSessionAtCapacity,
  isSessionHistory,
} from "./yoga-session.model";

@Pipe({
  name: "isSessionAtCapacity",
})
export class SessionAtCapacityPipe implements PipeTransform {
  transform(value: any): boolean | null {
    return value ? isSessionAtCapacity(value) : null;
  }
}

@Pipe({
  name: "isSessionLockout",
})
export class IsSessionLockoutPipe implements PipeTransform {
  transform(value: any): boolean | null {
    return value ? isSessionAfterLockout(value) : null;
  }
}

@Pipe({
  name: "isSessionHistory",
})
export class IsSessionHistoryPipe implements PipeTransform {
  transform(value: any): boolean | null {
    return value ? isSessionHistory(value) : null;
  }
}

@Pipe({
  name: "isSessionReservable",
})
export class IsSessionReservablePipe implements PipeTransform {
  transform(value: any): boolean | null {
    return value ? !isSessionHistory(value) && !isSessionAfterLockout(value) && !isSessionAtCapacity(value) : null;
  }
}