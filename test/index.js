const test = require('test');
test.setup();

const gui = require('gui');
const coroutine = require('coroutine');
require("../");

describe('WebView extended tests', function () {
    let win;

    before(function () {
        win = gui.open({
            width: 400,
            height: 300
        });
    });

    after(function () {
        win.close();
    });

    beforeEach(function () {
        win.setHtml("");
        coroutine.sleep(100);
    });

    it('should get offsetHeight', function () {
        win.setHtml(`<div id='test' style='height: 100px;'></div>`);
        const el = win.querySelector("#test");
        assert.strictEqual(el.offsetHeight, 100);
    });

    it('should get offsetLeft', function () {
        win.setHtml(`<div id='test' style='position: absolute; left: 50px;'></div>`);
        const el = win.querySelector("#test");
        assert.strictEqual(el.offsetLeft, 50);
    });

    it('should get offsetTop', function () {
        win.setHtml(`<div id='test' style='position: absolute; top: 50px;'></div>`);
        const el = win.querySelector("#test");
        assert.strictEqual(el.offsetTop, 50);
    });

    it('should get offsetWidth', function () {
        win.setHtml(`<div id='test' style='width: 100px;'></div>`);
        const el = win.querySelector("#test");
        assert.strictEqual(el.offsetWidth, 100);
    });

    it('should get clientHeight', function () {
        win.setHtml(`<div id='test' style='height: 100px;'></div>`);
        const el = win.querySelector("#test");
        assert.strictEqual(el.clientHeight, 100);
    });

    it('should get clientLeft', function () {
        win.setHtml(`<div id='test' style='border-left: 10px solid;'></div>`);
        const el = win.querySelector("#test");
        assert.strictEqual(el.clientLeft, 10);
    });

    it('should get clientTop', function () {
        win.setHtml(`<div id='test' style='border-top: 10px solid;'></div>`);
        const el = win.querySelector("#test");
        assert.strictEqual(el.clientTop, 10);
    });

    it('should get clientWidth', function () {
        win.setHtml(`<div id='test' style='width: 100px;'></div>`);
        const el = win.querySelector("#test");
        assert.strictEqual(el.clientWidth, 100);
    });

    it('should get scrollHeight', function () {
        win.setHtml(`<div id='test' style='height: 50px; overflow: auto;'><div style='height: 100px;'></div></div>`);
        const el = win.querySelector("#test");
        assert.strictEqual(el.scrollHeight, 100);
    });

    todo('should get and set scrollLeft', function () {
        win.setHtml(`<div id='test' style='width: 50px; overflow: auto;'><div style='width: 100px;'></div></div>`);
        const el = win.querySelector("#test");
        el.scrollLeft = 10;
        assert.strictEqual(el.scrollLeft, 10);
    });

    it('should get and set scrollTop', function () {
        win.setHtml(`<div id='test' style='height: 50px; overflow: auto;'><div style='height: 100px;'></div></div>`);
        const el = win.querySelector("#test");
        el.scrollTop = 10;
        assert.strictEqual(el.scrollTop, 10);
    });

    it('should get and set innerText', function () {
        win.setHtml(`<div id='test'>Hello World</div>`);
        const el = win.querySelector("#test");
        assert.strictEqual(el.innerText, 'Hello World');
        el.innerText = 'New Text';
        assert.strictEqual(el.innerText, 'New Text');
    });

    it('should cross-check innerText and innerHTML', function () {
        win.setHtml(`<div id='test'>Hello <span>World</span></div>`);
        const el = win.querySelector("#test");
        assert.strictEqual(el.innerText, 'Hello World');
        assert.strictEqual(el.innerHTML, 'Hello <span>World</span>');
        el.innerText = 'New Text';
        assert.strictEqual(el.innerText, 'New Text');
        assert.strictEqual(el.innerHTML, 'New Text');
        el.innerHTML = 'Hello <span>World</span>';
        assert.strictEqual(el.innerText, 'Hello World');
        assert.strictEqual(el.innerHTML, 'Hello <span>World</span>');
    });

    it('should get and set innerHTML', function () {
        win.setHtml(`<div id='test'>Hello World</div>`);
        const el = win.querySelector("#test");
        assert.strictEqual(el.innerHTML, 'Hello World');
        el.innerHTML = 'New HTML';
        assert.strictEqual(el.innerHTML, 'New HTML');
    });

    it('should get and set outerHTML', function () {
        win.setHtml(`<div id='test'>Hello World</div>`);
        const el = win.querySelector("#test");
        assert.strictEqual(el.outerHTML, `<div id="test">Hello World</div>`);
        el.outerHTML = `<div id='test'>New HTML</div>`;
        const newEl = win.querySelector("#test");
        assert.strictEqual(newEl.outerHTML, `<div id="test">New HTML</div>`);
    });

    it('should cross-check innerHTML and outerHTML', function () {
        win.setHtml(`<div id='test'><span>Initial</span> Content</div>`);
        const el = win.querySelector("#test");

        assert.strictEqual(el.innerHTML, '<span>Initial</span> Content');
        assert.strictEqual(el.outerHTML, `<div id="test"><span>Initial</span> Content</div>`);

        el.innerHTML = '<span>Modified</span> Content';
        assert.strictEqual(el.innerHTML, '<span>Modified</span> Content');
        assert.strictEqual(el.outerHTML, `<div id="test"><span>Modified</span> Content</div>`);

        el.outerHTML = `<div id='test'><span>New</span> Content</div>`;
        const newEl = win.querySelector("#test");
        assert.strictEqual(newEl.innerHTML, '<span>New</span> Content');
        assert.strictEqual(newEl.outerHTML, `<div id="test"><span>New</span> Content</div>`);
    });

    it('should insert HTML at specified position', function () {
        win.setHtml(`<div id='test'><span>Original</span></div>`);
        const el = win.querySelector("#test");

        el.insertAdjacentHTML('beforebegin', '<div id="beforebegin">Before Begin</div>');
        assert.strictEqual(win.querySelector("#beforebegin").textContent, 'Before Begin');

        el.insertAdjacentHTML('afterbegin', '<div id="afterbegin">After Begin</div>');
        assert.strictEqual(win.querySelector("#afterbegin").textContent, 'After Begin');

        el.insertAdjacentHTML('beforeend', '<div id="beforeend">Before End</div>');
        assert.strictEqual(win.querySelector("#beforeend").textContent, 'Before End');

        el.insertAdjacentHTML('afterend', '<div id="afterend">After End</div>');
        assert.strictEqual(win.querySelector("#afterend").textContent, 'After End');
    });

    it('should get previousSibling and nextSibling', function () {
        win.setHtml(`<div id='first'></div><div id='second'></div><div id='third'></div>`);
        const first = win.querySelector("#first");
        const second = win.querySelector("#second");
        const third = win.querySelector("#third");

        assert.strictEqual(second.previousSibling.id, first.id);
        assert.strictEqual(second.nextSibling.id, third.id);
    });

    it('should get parentNode', function () {
        win.setHtml(`<div id='parent'><div id='child'></div></div>`);
        const parent = win.querySelector("#parent");
        const child = win.querySelector("#child");

        assert.strictEqual(child.parentNode.id, parent.id);
    });

    it('should get firstChild and lastChild', function () {
        win.setHtml(`<div id='parent'><div id='first'></div><div id='last'></div></div>`);
        const parent = win.querySelector("#parent");
        const first = win.querySelector("#first");
        const last = win.querySelector("#last");

        assert.strictEqual(parent.firstChild.id, first.id);
        assert.strictEqual(parent.lastChild.id, last.id);
    });

    it('should get firstElementChild and lastElementChild', function () {
        win.setHtml(`<div id='parent'><div id='first'></div><div id='last'></div></div>`);
        const parent = win.querySelector("#parent");
        const first = win.querySelector("#first");
        const last = win.querySelector("#last");

        assert.strictEqual(parent.firstElementChild.id, first.id);
        assert.strictEqual(parent.lastElementChild.id, last.id);
    });

    it('should get nextElementSibling and previousElementSibling', function () {
        win.setHtml(`<div id='first'></div><div id='second'></div><div id='third'></div>`);
        const first = win.querySelector("#first");
        const second = win.querySelector("#second");
        const third = win.querySelector("#third");

        assert.strictEqual(second.previousElementSibling.id, first.id);
        assert.strictEqual(second.nextElementSibling.id, third.id);
    });

    it('should remove an element from the DOM', function () {
        win.setHtml(`<div id='parent'><div id='child'>Child</div></div>`);
        const parent = win.querySelector("#parent");
        const child = win.querySelector("#child");

        assert.strictEqual(parent.contains(child), true);

        child.remove();

        assert.strictEqual(parent.contains(child), false);
    });

    it('should get children and childNodes', function () {
        win.setHtml(`<div id='parent'><div id='child1'></div><div id='child2'></div></div>`);
        const parent = win.querySelector("#parent");
        const children = parent.children;
        const childNodes = parent.childNodes;

        assert.strictEqual(children.length, 2);
        assert.strictEqual(childNodes.length, 2);
        assert.strictEqual(children[0].id, 'child1');
        assert.strictEqual(children[1].id, 'child2');
        assert.strictEqual(childNodes[0].id, 'child1');
        assert.strictEqual(childNodes[1].id, 'child2');
    });

    it('should check if an element contains another', function () {
        win.setHtml(`<div id='parent'><div id='child'></div></div>`);
        const parent = win.querySelector("#parent");
        const child = win.querySelector("#child");

        assert.strictEqual(parent.contains(child), true);
        assert.strictEqual(child.contains(parent), false);
    });

    it('should insert text at specified position', function () {
        win.setHtml(`<div id='test'><span>Original</span></div>`);
        const el = win.querySelector("#test");

        el.insertAdjacentText('beforebegin', 'Before Begin');
        assert.strictEqual(el.previousSibling.textContent, 'Before Begin');

        el.insertAdjacentText('afterbegin', 'After Begin');
        assert.strictEqual(el.firstChild.textContent, 'After Begin');

        el.insertAdjacentText('beforeend', 'Before End');
        assert.strictEqual(el.lastChild.textContent, 'Before End');

        el.insertAdjacentText('afterend', 'After End');
        assert.strictEqual(el.nextSibling.textContent, 'After End');
    });

    it('should get and set name', function () {
        win.setHtml(`<input type='text' id='input' name='testName'>`);
        const input = win.querySelector("#input");
        assert.strictEqual(input.name, 'testName');
        input.name = 'newName';
        assert.strictEqual(input.name, 'newName');
    });

    it('should get and set src', function () {
        win.setHtml(`<img id='image' src='test.jpg'>`);
        const img = win.querySelector("#image");
        assert.strictEqual(img.src, 'test.jpg');
        img.src = 'new.jpg';
        assert.strictEqual(img.src, 'new.jpg');
    });

    it('should get and set href', function () {
        win.setHtml(`<a id='link' href='https://www.example.com'>Example</a>`);
        const link = win.querySelector("#link");
        assert.strictEqual(link.href, 'https://www.example.com/');
        link.href = 'https://www.newexample.com';
        assert.strictEqual(link.href, 'https://www.newexample.com/');
    });

    it('should get and set alt', function () {
        win.setHtml(`<img id='image' alt='testAlt'>`);
        const img = win.querySelector("#image");
        assert.strictEqual(img.alt, 'testAlt');
        img.alt = 'newAlt';
        assert.strictEqual(img.alt, 'newAlt');
    });

    it('should get and set title', function () {
        win.setHtml(`<div id='test' title='testTitle'>Hello World</div>`);
        const el = win.querySelector("#test");
        assert.strictEqual(el.title, 'testTitle');
        el.title = 'newTitle';
        assert.strictEqual(el.title, 'newTitle');
    });

    it('should get and set disabled', function () {
        win.setHtml(`<button id='button' disabled>Click me</button>`);
        const button = win.querySelector("#button");
        assert.strictEqual(button.disabled, true);
        button.disabled = false;
        assert.strictEqual(button.disabled, false);
    });

    it('should get and set checked', function () {
        win.setHtml(`<input type='checkbox' id='checkbox' checked>`);
        const checkbox = win.querySelector("#checkbox");
        assert.strictEqual(checkbox.checked, true);
        checkbox.checked = false;
        assert.strictEqual(checkbox.checked, false);
    });

    it('should get and set selected', function () {
        win.setHtml(`<select id='select'><option id='option'>Option</option><option selected=true>Option</option></select>`);
        const option = win.querySelector("#option");
        assert.strictEqual(option.selected, false);
        option.selected = true;
        assert.strictEqual(option.selected, true);
    });

    it('should get and set placeholder', function () {
        win.setHtml(`<input type='text' id='input' placeholder='Enter text'>`);
        const input = win.querySelector("#input");
        assert.strictEqual(input.placeholder, 'Enter text');
        input.placeholder = 'New placeholder';
        assert.strictEqual(input.placeholder, 'New placeholder');
    });

    it('should get and set tabIndex', function () {
        win.setHtml(`<div id='test' tabindex='1'>Hello World</div>`);
        const el = win.querySelector("#test");
        assert.strictEqual(el.tabIndex, 1);
        el.tabIndex = 2;
        assert.strictEqual(el.tabIndex, 2);
    });

    it('should submit form', function () {
        win.setHtml(`<form id='form'><input type='submit'></form>`);
        const form = win.querySelector("#form");
        assert.doesNotThrow(() => form.submit());
    });

    it('should reset form', function () {
        win.setHtml(`<form id='form'><input type='text' value='test'></form>`);
        const input = win.querySelector("input");
        input.value = 'new value';
        assert.strictEqual(input.value, 'new value');

        const form = win.querySelector("#form");
        form.reset();
        assert.strictEqual(input.value, 'test');
    });

    it('should select text in input', function () {
        win.setHtml(`<input type='text' id='input' value='Hello World'>`);
        const input = win.querySelector("#input");
        input.select();
        assert.strictEqual(input.selectionStart, 0);
        assert.strictEqual(input.selectionEnd, 11);
    });

    it('should get, set, check, and remove attributes', function () {
        win.setHtml(`<div id='test' data-custom='initial'></div>`);
        const el = win.querySelector("#test");

        assert.strictEqual(el.getAttribute('data-custom'), 'initial');

        el.setAttribute('data-custom', 'updated');
        assert.strictEqual(el.getAttribute('data-custom'), 'updated');

        assert.strictEqual(el.hasAttribute('data-custom'), true);

        el.removeAttribute('data-custom');
        assert.strictEqual(el.hasAttribute('data-custom'), false);
        assert.strictEqual(el.getAttribute('data-custom'), null);
    });

    it('should scroll element into view', function () {
        win.setHtml(`<div id='test' style='margin-top: 1000px;'>Hello World</div>`);
        const el = win.querySelector("#test");
        assert.doesNotThrow(() => el.scrollIntoView());
    });
});

test.run(console.DEBUG);