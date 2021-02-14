/*
 * Copyright 2021 Marek Kobida
 */

import Router from './Router';

const router = new Router<['👋']>();

router.addRoute('/hello/:name').get(async ({ name }, $) => {
  console.log($, name); // 👋 marekkobida
});

router.test(['👋'], 'GET', '/hello/marekkobida');
