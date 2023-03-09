import { Injectable } from "@angular/core";

export enum StorageKeys {
  AttendeePhone = 'attendee_phone',
  AttendeeName = 'attendee_name',
}

Injectable()
export class LocalStorageService {

  get(key: StorageKeys): string | null {
    return localStorage.getItem(key);
  }

  set(key: StorageKeys, value: string) {
    localStorage.setItem(key, value);
  }

  remove(key: StorageKeys) {
    localStorage.removeItem(key);
  }

}