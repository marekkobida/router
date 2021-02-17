/*
 * Copyright 2021 Marek Kobida
 */

import React from 'react';

interface P {
  children: React.ReactNode;
  to: string;
}

function Link({ children, to }: P) {
  return <a href={'#' + to}>{children}</a>;
}

export default Link;
