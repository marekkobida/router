/*
 * Copyright 2021 Marek Kobida
 */

import React from 'react';
import Router from './Router';

const context = [`👋`] as const;

//                       | C
const router = new Router<typeof context>();

router
  .addRoute('/hello/:name')
  //                    | ...C
  .get(async ({ name }, $) => `${$} ${name}` /* 👋 marekkobida */);

//          | C
router.test(context, 'GET', '/hello/marekkobida').then($ => console.log($));

/**
 * React
 */

router.addRoute('/react').get(async ({}, $) => <h1>{$}</h1>);

router.test(context, 'GET', '/react').then($ => console.log($));
