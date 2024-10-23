var gui = require("gui");
var coroutine = require("coroutine");

var timeout = 5000;

const props = [
    'alt',
    'checked',
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
    'children',
    'childNodes',
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
    'blur',
    'click',
    'contains',
    'focus',
    'getAttribute',
    'hasAttribute',
    'insertAdjacentHTML',
    'insertAdjacentText',
    'remove',
    'removeAttribute',
    'reset',
    'scrollIntoView',
    'select',
    'setAttribute',
    'submit',
];

function El() { }

function encode_argument(arg) {
    if (arg instanceof El) {
        return arg.__selector;
    }

    return JSON.stringify(arg);
}

function wrap(o, selector) {
    var start = Date.now();
    while (!o.eval(`!!${selector}`)) {
        if (Date.now() - start > timeout) {
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

    props.forEach(prop => {
        Object.defineProperty(el, prop, {
            get: function () {
                return o.eval(`${selector}.${prop}`);
            },
            set: function (value) {
                return o.eval(`${selector}.${prop} = ${encode_argument(value)}`);
            }
        });
    });

    objs.forEach(prop => {
        Object.defineProperty(el, prop, {
            get: function () {
                return wrap(o, `${selector}.${prop}`);
            }
        });
    });

    methods.forEach(method => {
        el[method] = function () {
            const args = Array.from(arguments).map(arg => encode_argument(arg)).join(", ");
            return o.eval(`${selector}.${method}(${args})`);
        };
    });

    const proxy = new Proxy(el, {
        get: function (target, prop) {
            if (!isNaN(prop)) {
                return wrap(o, `${selector}[${prop}]`);
            }
            return target[prop];
        }
    });

    return proxy;
}

gui.WebView.prototype.querySelector = function (selector) {
    return wrap(this, `document.querySelector(${JSON.stringify(selector)})`);
}
