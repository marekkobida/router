/*
 * Copyright 2021 Marek Kobida
 */
import Router from '../Router.js';
import isNameValid from './isNameValid.js';
var router = new Router();
router
    .addRoute('/hello/:name')
    .get(isNameValid, function (_a) {
    var request = _a.request, response = _a.response, name = _a.urlParameters[0];
    return response("\uD83D\uDC4B " + name + " from " + request.url);
});
function server(request, response) {
    try {
        router.context = { request: request, response: response };
        router.test(request.method, request.url);
    }
    catch (error) {
        response(error.toString());
    }
}
server({ method: 'GET', url: '/hello/marekkobida' }, console.log);
