/*
 * Copyright 2021 Marek Kobida
 */

import React from 'react';
import RouterContext from './RouterContext';

interface P {
  children: React.ReactNode;
  to: string;
}

function Link({ children, to }: P) {
  const { router } = React.useContext(RouterContext);

  function onClick(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
    event.preventDefault();

    history.pushState(null, '', `#${to}`);

    router?.test('GET', to);
  }

  return <a onClick={onClick}>{children}</a>;
}

export default Link;
