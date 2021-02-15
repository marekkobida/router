`npm i warden-sk/router#compiled`

```ts
/*
 * Copyright 2021 Marek Kobida
 */

import Router from './Router';

//                       | C
const router = new Router<['👋']>();

router
  .addRoute<{ name: string }>('/hello/:name')
  .assignName('hello')
  //          | P       | ...C
  .get(async ({ name }, $) => {
    console.log($, name); // 👋 marekkobida
  });

//          | C
router.test(['👋'], 'GET', '/hello/marekkobida');
```
