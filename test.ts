/*
 * Copyright 2021 Marek Kobida
 */

import Router from './Router';

//                       | C
const router = new Router<['👋']>();

//             | P                                           | P       | ...C
router.addRoute<{ name: string }>('/hello/:name').get(async ({ name }, $) => {
  console.log($, name); // 👋 marekkobida
});

//          | C
router.test(['👋'], 'GET', '/hello/marekkobida');
