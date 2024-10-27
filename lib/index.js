var gui = require("gui");
var coroutine = require("coroutine");

exports.timeout = 5000;

const props = [
    'alt',
    'checked',
    'childElementCount',
    'className',
    'clientHeight',
    'clientLeft',
    'clientTop',
    'clientWidth',
    'disabled',
    'href',
    'id',
    'innerHTML',
    'innerText',
    'length',
    'name',
    'offsetHeight',
    'offsetLeft',
    'offsetTop',
    'offsetWidth',
    'outerHTML',
    'placeholder',
    'scrollHeight',
    'scrollLeft',
    'scrollTop',
    'scrollWidth',
    'selected',
    'selectionEnd',
    'selectionStart',
    'src',
    'tabIndex',
    'tagName',
    'textContent',
    'title',
    'value',
];

const objs = [
    'attributes',
    'children',
    'childNodes',
    'classList',
    'firstChild',
    'firstElementChild',
    'lastChild',
    'lastElementChild',
    'nextElementSibling',
    'nextSibling',
    'parentNode',
    'parentElement',
    'previousElementSibling',
    'previousSibling',
];

const methods = [
    'add',
    'blur',
    'click',
    'compareDocumentPosition',
    'contains',
    'focus',
    'getAttribute',
    'getAttributeNames',
    'hasAttribute',
    'hasAttributes',
    'insertAdjacentHTML',
    'insertAdjacentText',
    'remove',
    'removeAttribute',
    'removeChild',
    'reset',
    'scroll',
    'scrollIntoView',
    'scrollIntoViewIfNeeded',
    'scrollTo',
    'select',
    'setAttribute',
    'submit',
];

function El() { }

El.prototype.forEach = function (cb) {
    const len = this.length;
    for (let i = 0; i < len; i++) {
        cb(this[i], i);
    }
}

El.prototype.map = function (cb) {
    const result = [];
    const len = this.length;
    for (let i = 0; i < len; i++) {
        result.push(cb(this[i], i));
    }
    return result;
}

El.prototype.filter = function (cb) {
    const result = [];
    const len = this.length;
    for (let i = 0; i < len; i++) {
        if (cb(this[i], i)) {
            result.push(this[i]);
        }
    }
    return result;
}


El.prototype.reduce = function (cb, initialValue) {
    let accumulator = initialValue;
    const len = this.length;
    for (let i = 0; i < len; i++) {
        accumulator = cb(accumulator, this[i], i);
    }
    return accumulator;
}

El.prototype.some = function (cb) {
    const len = this.length;
    for (let i = 0; i < len; i++) {
        if (cb(this[i], i)) {
            return true;
        }
    }
    return false;
}

El.prototype.every = function (cb) {
    const len = this.length;
    for (let i = 0; i < len; i++) {
        if (!cb(this[i], i)) {
            return false;
        }
    }
    return true;
}

function encode_argument(arg) {
    if (arg instanceof El) {
        return arg.__selector;
    }

    return JSON.stringify(arg);
}

function wrap(o, selector) {
    var start = Date.now();
    while (!o.eval(`!!${selector}`)) {
        if (Date.now() - start > exports.timeout) {
            throw new Error("Timeout");
        }
        coroutine.sleep(100);
    }

    const el = new El();
    el.__selector = selector;
    el.hover = function () {
        o.eval(`${selector}.dispatchEvent(new MouseEvent('mouseover', {
                    view: window,
                    bubbles: true,
                    cancelable: true
                }));`);
    };

    const proxy = new Proxy(el, {
        get: function (target, prop) {
            if (props.includes(prop)) {
                return o.eval(`${selector}.${prop}`);
            }

            if (objs.includes(prop)) {
                return wrap(o, `${selector}.${prop}`);
            }

            if (methods.includes(prop)) {
                return function () {
                    const args = Array.from(arguments).map(arg => encode_argument(arg)).join(", ");
                    return o.eval(`${selector}.${prop}(${args})`);
                };
            }

            try {
                if (!isNaN(prop)) {
                    return wrap(o, `${selector}[${prop}]`);
                }
            } catch (e) { }

            return target[prop];
        },
        set: function (target, prop, value) {
            if (props.includes(prop)) {
                return o.eval(`${selector}.${prop} = ${encode_argument(value)}`);
            }
        }
    });

    return proxy;
}

gui.WebView.prototype.querySelector = function (selector) {
    return wrap(this, `document.querySelector(${JSON.stringify(selector)})`);
}

gui.WebView.prototype.querySelectorAll = function (selector) {
    return wrap(this, `document.querySelectorAll(${JSON.stringify(selector)})`);
}

gui.WebView.prototype.getElementById = function (id) {
    return wrap(this, `document.getElementById(${JSON.stringify(id)})`);
}

gui.WebView.prototype.getElementsByClassName = function (className) {
    return wrap(this, `document.getElementsByClassName(${JSON.stringify(className)})`);
}

gui.WebView.prototype.getElementsByTagName = function (tagName) {
    return wrap(this, `document.getElementsByTagName(${JSON.stringify(tagName)})`);
}

gui.WebView.prototype.getElementsByName = function (name) {
    return wrap(this, `document.getElementsByName(${JSON.stringify(name)})`);
}
