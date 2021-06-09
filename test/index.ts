/*
 * Copyright 2021 Marek Kobida
 */

import Router from '../Router.js';
import isNameValid from './isNameValid.js';

interface Context extends Router.Context {
  request: Request;
  response: Response;
}

interface Request {
  method: string;
  url: string;
}

interface Response {
  (response: string): void;
}

const router = new Router<Context>();

router
  .addRoute('/hello/:name')
  .get(isNameValid, ({ request, response, urlParameters: [name] }) => response(`👋 ${name} from ${request.url}`));

function server(request: Request, response: Response) {
  try {
    router.context = { request, response };

    router.test(request.method, request.url);
  } catch (error) {
    response(error.toString());
  }
}

server({ method: 'GET', url: '/hello/marekkobida' }, console.log);
