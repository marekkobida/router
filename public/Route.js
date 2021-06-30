/*
 * Copyright 2021 Marek Kobida
 */
import pathToRegExp from './pathToRegExp/index.js';
class Route {
    #children = [];
    #context;
    #url;
    constructor(url, context = {}) {
        this.#context = context;
        this.#url = [url, pathToRegExp(url)];
    }
    addChild(method, ...afterTest) {
        this.#children.push([method, afterTest.flat(Infinity)]);
        return this;
    }
    set context(context) {
        this.#context = context;
    }
    delete(...afterTest) {
        this.addChild('DELETE', ...afterTest);
        return this;
    }
    get(...afterTest) {
        this.addChild('GET', ...afterTest);
        return this;
    }
    options(...afterTest) {
        this.addChild('OPTIONS', ...afterTest);
        return this;
    }
    patch(...afterTest) {
        this.addChild('PATCH', ...afterTest);
        return this;
    }
    post(...afterTest) {
        this.addChild('POST', ...afterTest);
        return this;
    }
    put(...afterTest) {
        this.addChild('PUT', ...afterTest);
        return this;
    }
    readUrlParameters(url) {
        const [_1, ..._2] = url.match(this.#url[1]) || [];
        return _2;
    }
    #test = (afterTest, i, url) => {
        const next = () => {
            this.#test(afterTest, i + 1, url);
        };
        if (afterTest[i]) {
            const context = {
                ...this.#context,
                urlParameters: this.readUrlParameters(url),
            };
            switch (afterTest[i].length) {
                case 1:
                    afterTest[i](context, () => { });
                    next();
                    break;
                case 2:
                    afterTest[i](context, next);
                    break;
            }
        }
        return this;
    };
    test(method, url) {
        if (this.#url[1].test(url))
            for (const child of this.#children)
                if (child[0] === method)
                    return this.#test(child[1], 0, url);
    }
    get url() {
        return this.#url;
    }
}
export default Route;
