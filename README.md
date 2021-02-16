`npm i warden-sk/router#compiled`

```tsx
import Router from './Router';

const context = ['👋'] as const;

//                       | C
const router = new Router<typeof context>();

router
  .addRoute('/hello/:name')
  //              | ...C
  .get(({ name }, $) => console.log(`${$} ${name}`) /* 👋 marekkobida */);

//          | C
router.test(context, 'GET', '/hello/marekkobida');
```
