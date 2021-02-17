/*
 * Copyright 2021 Marek Kobida
 */

import React from 'react';
import Router from '../Router';

interface C {
  router?: Router<[(element: React.ReactNode) => any]>;
}

const RouterContext = React.createContext<C>({});

export default RouterContext;
