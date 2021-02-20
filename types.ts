/*
 * Copyright 2021 Marek Kobida
 */

export namespace R {
  export interface AfterTest<C extends Context = {}> {
    (context: C & { urlParameters: UrlParameters }, next: () => void): void;
  }

  export interface Context extends Record<string, any> {}

  export interface UrlParameters extends Partial<Record<string, string>> {}
}
