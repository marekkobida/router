/*
 * Copyright 2021 Marek Kobida
 */

function invariant(condition: any, message: string): asserts condition {
  if (!condition) {
    throw new Error(message);
  }
}

export default invariant;
