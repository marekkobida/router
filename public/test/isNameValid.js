/*
 * Copyright 2021 Marek Kobida
 */
const isNameValid = ({ urlParameters: [name] }, next) => {
    if (name && /^[a-z]+$/.test(name))
        return next();
    throw new Error('The name is not valid.');
};
export default isNameValid;
