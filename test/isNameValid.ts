/*
 * Copyright 2021 Marek Kobida
 */

import { R } from '../types';

const isNameValid: R.AfterTest = ({ urlParameters: { name } }, next) => {
  if (name && /^[a-z]+$/.test(name)) return next();

  throw new Error('The name is not valid.');
};

export default isNameValid;
