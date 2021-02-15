`npm i warden-sk/router#compiled`

```tsx
/*
 * Copyright 2021 Marek Kobida
 */

import Router from './Router';

const context = [`👋`] as const;

//                       | C
const router = new Router<typeof context>();

router
  .addRoute('/hello/:name')
  //                    | ...C
  .get(async ({ name }, $) => console.log(`${$} ${name}`) /* 👋 marekkobida */);

//          | C
router.test(context, 'GET', '/hello/marekkobida');
```
