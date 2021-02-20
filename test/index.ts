/*
 * Copyright 2021 Marek Kobida
 */

import Router from '../Router';
import isNameValid from './isNameValid';

interface Request {
  method: string;
  url: string;
}

interface Response {
  (response: string): void;
}

interface Context {
  request: Request;
  response: Response;
}

const router = new Router<Context>();

router
  .addRoute('/hello/:name')
  .get(isNameValid, ({ request, response, urlParameters: { name } }) => response(`👋 ${name} from ${request.url}`));

function server(request: Request, response: Response) {
  try {
    router.context = { request, response };

    router.test(request.method, request.url);
  } catch (error) {
    response(error.toString());
  }
}

server({ method: 'GET', url: '/hello/marekkobida' }, console.log);
