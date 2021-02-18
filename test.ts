/*
 * Copyright 2021 Marek Kobida
 */

import Router from './Router';

const context = ['👋'];

const currentUrl = '/hello/marekkobida';

const router = new Router<typeof context>();

router.assignContext(context);

router
  .addRoute('/hello/:name')
  .get(({ name }, ...context) => console.log(`${context[0]} ${name}`) /* 👋 marekkobida */);

router.test('GET', currentUrl);
