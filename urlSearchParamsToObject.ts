/*
 * Copyright 2021 Marek Kobida
 */

function urlSearchParamsToObject(urlSearchParams: URLSearchParams): Record<string, string> {
  const _1: Record<string, string> = {};

  for (const [l, r] of urlSearchParams) {
    // if (l in _1) {
    //   const _2 = _1[l];
    //
    //   // string
    //   if (typeof _2 === 'string') {
    //     _1[l] = [_2, r];
    //   }
    //
    //   // string[]
    //   if (Array.isArray(_2)) {
    //     _2.push(r);
    //   }
    // } else {
    //   _1[l] = r;
    // }
    _1[l] = r;
  }

  return _1;
}

export default urlSearchParamsToObject;
