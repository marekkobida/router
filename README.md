`npm i warden-sk/router#compiled`

```ts
import Router from './Router';

const router = new Router<['👋']>();

router.addRoute('/hello/:name').get(async ({ name }, $) => {
  console.log($, name); // 👋 marekkobida
});

router.test(['👋'], 'GET', '/hello/marekkobida');
```
