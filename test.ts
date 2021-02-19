/*
 * Copyright 2021 Marek Kobida
 */

import Router from './Router';

interface Request {
  method: string;
  url: string;
}

interface Response {
  (response: any): any;
}

interface Context {
  request: Request;
  response: Response;
}

const router = new Router<Context>();

router.addRoute('/hello/:name').get(({ name }, { request, response }) => response(`👋 ${name} from ${request.url}`));

function test(request: Request, response: Response) {
  router.context = { request, response };

  router.test(request.method, request.url);
}

test({ method: 'GET', url: '/hello/marekkobida' }, console.log);
