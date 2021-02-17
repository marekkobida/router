/*
 * Copyright 2021 Marek Kobida
 */

import React from 'react';
import RouterContext from './RouterContext';

interface P {
  children: React.ReactNode;
  path: string;
}

function Route({ children, path }: P) {
  const { router } = React.useContext(RouterContext);

  router?.addRoute(path).get(({}, writeElement) => writeElement(children));

  return null;
}

export default Route;
