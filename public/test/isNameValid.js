/*
 * Copyright 2021 Marek Kobida
 */
var isNameValid = function (_a, next) {
    var name = _a.urlParameters[0];
    if (name && /^[a-z]+$/.test(name))
        return next();
    throw new Error('The name is not valid.');
};
export default isNameValid;
