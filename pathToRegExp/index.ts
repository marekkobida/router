/*
 * Copyright 2021 Marek Kobida
 */

import Lexer from './Lexer';
import Parser from './Parser';

function pathToRegExp(path: string) {
  const lexer = new Lexer();
  const parser = new Parser();

  const tokens = lexer.test(path);

  console.log(parser.test(tokens));
}

pathToRegExp('/test/:id(\\d+)\\-*');
