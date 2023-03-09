import { Injectable } from "@angular/core";
import { AngularFireRemoteConfig } from "@angular/fire/compat/remote-config";
import { Value } from "@angular/fire/remote-config/firebase";

import { BehaviorSubject, Observable } from "rxjs";

const configDefaults: Config = {
  defaultSessionLockTime: 24,
  defaultSessionCapacity: 16,
  sendCodeCoolDown: 5,
  sessionPlaces: [],
};

export interface Config {
  defaultSessionLockTime: number;
  defaultSessionCapacity: number;
  sendCodeCoolDown: number;
  sessionPlaces: string[];
}

@Injectable()
export class RemoteConfigService {
  config$: Observable<Config>;

  get configSnapshot(): Config {
    return this.configSubject.value;
  }

  private configSubject: BehaviorSubject<Config> = new BehaviorSubject(
    configDefaults
  );

  constructor(private remoteConfig: AngularFireRemoteConfig) {
    this.config$ = this.configSubject.asObservable();
  }

  async fetchConfig(): Promise<void> {
    await this.remoteConfig.fetchAndActivate();
    const config = await this.readConfig();
    this.configSubject.next(config);
  }

  private async readConfig(): Promise<Config> {
    const firebaseConfig = await this.remoteConfig.getAll();

    return Object.keys(firebaseConfig).reduce((config, key) => {
      const addToConfig = <ConfigKey extends keyof Config>(
        key: ConfigKey,
        getter: (value: Value) => Config[ConfigKey]
      ) => ({
        ...config,
        [key]: getter(firebaseConfig[key]),
      });

      switch (key) {
        case "defaultSessionLockTime":
          return addToConfig(key, (c) => c.asNumber());
        case "defaultSessionCapacity":
          return addToConfig(key, (c) => c.asNumber());
        case "sessionPlaces":
          return addToConfig(key, (c) => c.asString().split("\n"));
        case "sendCodeCoolDown":
          return addToConfig(key, (c) => c.asNumber());
        default:
          return config;
      }
    }, configDefaults);
  }

}
