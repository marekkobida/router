/*
 * Copyright 2021 Marek Kobida
 */

import Lexer from './Lexer';

function pathToRegExp(path: string) {
  const lexer = new Lexer();

  const tokens = lexer.test(path);

  console.log('tokens', tokens);
}

pathToRegExp('/test/:id(\\d+)\\-*');
