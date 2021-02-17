/*
 * Copyright 2021 Marek Kobida
 */

import Router from './Router';

const context = ['👋'];

const router = new Router<typeof context>();

router
  .addRoute('/hello/:name')
  .get(({ name }, ...context) => console.log(`${context[0]} ${name}`) /* 👋 marekkobida */);

router.assignContext(context);

router.test('GET', '/hello/marekkobida');
