/*
 * Copyright 2021 Marek Kobida
 */
import Router from '../Router.js';
import isNameValid from './isNameValid.js';
const router = new Router();
router
    .addRoute('/hello/:name')
    .get(isNameValid, ({ request, response, urlParameters: [name] }) => response(`👋 ${name} from ${request.url}`));
function server(request, response) {
    try {
        router.context = { request, response };
        router.test(request.method, request.url);
    }
    catch (error) {
        response(error.toString());
    }
}
server({ method: 'GET', url: '/hello/marekkobida' }, console.log);
