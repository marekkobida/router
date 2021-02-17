/*
 * Copyright 2021 Marek Kobida
 */

import R from '../Router';
import React from 'react';
import RouterContext from './RouterContext';

interface P {
  children: React.ReactNode;
}

const router = new R();

function Router({ children }: P) {
  const [element, writeElement] = React.useState<React.ReactNode>();

  function test() {
    const url = location.hash.substring(1) || '/';

    router.test([writeElement], 'GET', url);
  }

  React.useEffect(() => {
    test();

    window.addEventListener('hashchange', test);
  }, []);

  return (
    <RouterContext.Provider value={{ router }}>
      {children}
      {element}
    </RouterContext.Provider>
  );
}

export default Router;
