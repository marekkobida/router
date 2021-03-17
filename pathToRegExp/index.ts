/*
 * Copyright 2021 Marek Kobida
 */

import Lexer from './Lexer';
// import Parser from './Parser';

function pathToRegExp(path: string) {
  const lexer = new Lexer();
  // const parser = new Parser();

  const _1 = lexer.test(path);

  console.log('lexer', _1);

  // const _2 = parser.test(_1);
  //
  // console.log('parser', _2);
  //
  // let $ = '';
  //
  // $ += '^';
  //
  // for (const token of _2) {
  //   if (typeof token === 'string') {
  //     $ += token;
  //   } else {
  //     if (token.pattern) {
  //       if (token.prefix) {
  //         if (token.modifier === '+' || token.modifier === '*') {
  //           const mod = token.modifier === '*' ? '?' : '';
  //           $ += `(?:${token.prefix}((?:${token.pattern})(?:${token.prefix}(?:${token.pattern}))*))${mod}`;
  //         } else {
  //           $ += `(?:${token.prefix}(${token.pattern}))${token.modifier}`;
  //         }
  //       } else {
  //         $ += `(${token.pattern})${token.modifier}`;
  //       }
  //     } else {
  //       $ += `(?:${token.prefix})${token.modifier}`;
  //     }
  //   }
  // }
  //
  // $ += '$';
  //
  // return new RegExp($);
}

pathToRegExp('/test/:id(\\d+)');
