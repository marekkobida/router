/*
 * Copyright 2021 Marek Kobida
 */

import R from '../Router';
import React from 'react';
import RouterContext from './RouterContext';

interface P {
  children: React.ReactNode;
}

const router = new R<[(element: React.ReactNode) => any]>();

function test() {
  const url = location.hash.substring(1) || '/';

  router.test('GET', url);
}

function Router({ children }: P) {
  const [element, writeElement] = React.useState<React.ReactNode>();

  React.useEffect(() => {
    router.assignContext([writeElement]);

    test();

    window.addEventListener('popstate', test);
  }, []);

  return (
    <RouterContext.Provider value={{ router }}>
      {children}
      {element}
    </RouterContext.Provider>
  );
}

export default Router;
