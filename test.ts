/*
 * Copyright 2021 Marek Kobida
 */

import Router from './Router';

const router = new Router().assignContext(['👋']);

router
  .addRoute('/hello/:name')
  .get(({ name }, ...context) => console.log(`${context[0]} ${name}`) /* 👋 marekkobida */);

router.test('GET', '/hello/marekkobida');

console.log(router.currentRoute?.currentUrlParameters);
