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
        assert.equal(el.offsetHeight, 100);
    });

    it('should get offsetLeft', function () {
        win.setHtml(`<div id='test' style='position: absolute; left: 50px;'></div>`);
        const el = win.querySelector("#test");
        assert.equal(el.offsetLeft, 50);
    });

    it('should get offsetTop', function () {
        win.setHtml(`<div id='test' style='position: absolute; top: 50px;'></div>`);
        const el = win.querySelector("#test");
        assert.equal(el.offsetTop, 50);
    });

    it('should get offsetWidth', function () {
        win.setHtml(`<div id='test' style='width: 100px;'></div>`);
        const el = win.querySelector("#test");
        assert.equal(el.offsetWidth, 100);
    });

    it('should get clientHeight', function () {
        win.setHtml(`<div id='test' style='height: 100px;'></div>`);
        const el = win.querySelector("#test");
        assert.equal(el.clientHeight, 100);
    });

    it('should get clientLeft', function () {
        win.setHtml(`<div id='test' style='border-left: 10px solid;'></div>`);
        const el = win.querySelector("#test");
        assert.equal(el.clientLeft, 10);
    });

    it('should get clientTop', function () {
        win.setHtml(`<div id='test' style='border-top: 10px solid;'></div>`);
        const el = win.querySelector("#test");
        assert.equal(el.clientTop, 10);
    });

    it('should get clientWidth', function () {
        win.setHtml(`<div id='test' style='width: 100px;'></div>`);
        const el = win.querySelector("#test");
        assert.equal(el.clientWidth, 100);
    });

    it('should get scrollHeight', function () {
        win.setHtml(`<div id='test' style='height: 50px; overflow: auto;'><div style='height: 100px;'></div></div>`);
        const el = win.querySelector("#test");
        assert.equal(el.scrollHeight, 100);
    });

    todo('should get and set scrollLeft', function () {
        win.setHtml(`<div id='test' style='width: 50px; overflow: auto;'><div style='width: 100px;'></div></div>`);
        const el = win.querySelector("#test");
        el.scrollLeft = 10;
        assert.equal(el.scrollLeft, 10);
    });

    it('should get and set scrollTop', function () {
        win.setHtml(`<div id='test' style='height: 50px; overflow: auto;'><div style='height: 100px;'></div></div>`);
        const el = win.querySelector("#test");
        el.scrollTop = 10;
        assert.equal(el.scrollTop, 10);
    });

    it('should get and set classList', function () {
        win.setHtml(`<div id='test' class='foo bar'></div>`);
        const el = win.querySelector("#test");
        assert.equal(el.classList.contains('foo'), true);
        assert.equal(el.classList.contains('bar'), true);
        el.classList.add('baz');
        assert.equal(el.classList.contains('baz'), true);
        el.classList.remove('foo');
        assert.equal(el.classList.contains('foo'), false);
    });

    it('should get and set className', function () {
        win.setHtml(`<div id='test' class='foo bar'></div>`);
        const el = win.querySelector("#test");
        assert.equal(el.className, 'foo bar');
        el.className = 'baz qux';
        assert.equal(el.className, 'baz qux');
    });

    it('should get and set innerText', function () {
        win.setHtml(`<div id='test'>Hello World</div>`);
        const el = win.querySelector("#test");
        assert.equal(el.innerText, 'Hello World');
        el.innerText = 'New Text';
        assert.equal(el.innerText, 'New Text');
    });

    it('should cross-check innerText and innerHTML', function () {
        win.setHtml(`<div id='test'>Hello <span>World</span></div>`);
        const el = win.querySelector("#test");
        assert.equal(el.innerText, 'Hello World');
        assert.equal(el.innerHTML, 'Hello <span>World</span>');
        el.innerText = 'New Text';
        assert.equal(el.innerText, 'New Text');
        assert.equal(el.innerHTML, 'New Text');
        el.innerHTML = 'Hello <span>World</span>';
        assert.equal(el.innerText, 'Hello World');
        assert.equal(el.innerHTML, 'Hello <span>World</span>');
    });

    it('should get and set innerHTML', function () {
        win.setHtml(`<div id='test'>Hello World</div>`);
        const el = win.querySelector("#test");
        assert.equal(el.innerHTML, 'Hello World');
        el.innerHTML = 'New HTML';
        assert.equal(el.innerHTML, 'New HTML');
    });

    it('should get and set outerHTML', function () {
        win.setHtml(`<div id='test'>Hello World</div>`);
        const el = win.querySelector("#test");
        assert.equal(el.outerHTML, `<div id="test">Hello World</div>`);
        el.outerHTML = `<div id='test'>New HTML</div>`;
        const newEl = win.querySelector("#test");
        assert.equal(newEl.outerHTML, `<div id="test">New HTML</div>`);
    });

    it('should cross-check innerHTML and outerHTML', function () {
        win.setHtml(`<div id='test'><span>Initial</span> Content</div>`);
        const el = win.querySelector("#test");

        assert.equal(el.innerHTML, '<span>Initial</span> Content');
        assert.equal(el.outerHTML, `<div id="test"><span>Initial</span> Content</div>`);

        el.innerHTML = '<span>Modified</span> Content';
        assert.equal(el.innerHTML, '<span>Modified</span> Content');
        assert.equal(el.outerHTML, `<div id="test"><span>Modified</span> Content</div>`);

        el.outerHTML = `<div id='test'><span>New</span> Content</div>`;
        const newEl = win.querySelector("#test");
        assert.equal(newEl.innerHTML, '<span>New</span> Content');
        assert.equal(newEl.outerHTML, `<div id="test"><span>New</span> Content</div>`);
    });

    it('should insert HTML at specified position', function () {
        win.setHtml(`<div id='test'><span>Original</span></div>`);
        const el = win.querySelector("#test");

        el.insertAdjacentHTML('beforebegin', '<div id="beforebegin">Before Begin</div>');
        assert.equal(win.querySelector("#beforebegin").textContent, 'Before Begin');

        el.insertAdjacentHTML('afterbegin', '<div id="afterbegin">After Begin</div>');
        assert.equal(win.querySelector("#afterbegin").textContent, 'After Begin');

        el.insertAdjacentHTML('beforeend', '<div id="beforeend">Before End</div>');
        assert.equal(win.querySelector("#beforeend").textContent, 'Before End');

        el.insertAdjacentHTML('afterend', '<div id="afterend">After End</div>');
        assert.equal(win.querySelector("#afterend").textContent, 'After End');
    });

    it('should get previousSibling and nextSibling', function () {
        win.setHtml(`<div id='first'></div><div id='second'></div><div id='third'></div>`);
        const first = win.querySelector("#first");
        const second = win.querySelector("#second");
        const third = win.querySelector("#third");

        assert.equal(second.previousSibling.id, first.id);
        assert.equal(second.nextSibling.id, third.id);
    });

    it('should get parentNode', function () {
        win.setHtml(`<div id='parent'><div id='child'></div></div>`);
        const parent = win.querySelector("#parent");
        const child = win.querySelector("#child");

        assert.equal(child.parentNode.id, parent.id);
    });

    it('should get firstChild and lastChild', function () {
        win.setHtml(`<div id='parent'><div id='first'></div><div id='last'></div></div>`);
        const parent = win.querySelector("#parent");
        const first = win.querySelector("#first");
        const last = win.querySelector("#last");

        assert.equal(parent.firstChild.id, first.id);
        assert.equal(parent.lastChild.id, last.id);
    });

    it('should get firstElementChild and lastElementChild', function () {
        win.setHtml(`<div id='parent'><div id='first'></div><div id='last'></div></div>`);
        const parent = win.querySelector("#parent");
        const first = win.querySelector("#first");
        const last = win.querySelector("#last");

        assert.equal(parent.firstElementChild.id, first.id);
        assert.equal(parent.lastElementChild.id, last.id);
    });

    it('should get nextElementSibling and previousElementSibling', function () {
        win.setHtml(`<div id='first'></div><div id='second'></div><div id='third'></div>`);
        const first = win.querySelector("#first");
        const second = win.querySelector("#second");
        const third = win.querySelector("#third");

        assert.equal(second.previousElementSibling.id, first.id);
        assert.equal(second.nextElementSibling.id, third.id);
    });

    it('should remove an element from the DOM', function () {
        win.setHtml(`<div id='parent'><div id='child'>Child</div></div>`);
        const parent = win.querySelector("#parent");
        const child = win.querySelector("#child");

        assert.equal(parent.contains(child), true);

        child.remove();

        assert.equal(parent.contains(child), false);
    });

    it('should get children and childNodes', function () {
        win.setHtml(`<div id='parent'><div id='child1'></div><div id='child2'></div></div>`);
        const parent = win.querySelector("#parent");
        const children = parent.children;
        const childNodes = parent.childNodes;

        assert.equal(children.length, 2);
        assert.equal(childNodes.length, 2);
        assert.equal(children[0].id, 'child1');
        assert.equal(children[1].id, 'child2');
        assert.equal(childNodes[0].id, 'child1');
        assert.equal(childNodes[1].id, 'child2');
    });

    it('should remove a child element from the DOM', function () {
        win.setHtml(`<div id='parent'><div id='child'>Child</div></div>`);
        const parent = win.querySelector("#parent");
        const child = win.querySelector("#child");

        assert.equal(parent.contains(child), true);

        parent.removeChild(child);

        assert.equal(parent.contains(child), false);
    });

    it('should check if an element contains another', function () {
        win.setHtml(`<div id='parent'><div id='child'></div></div>`);
        const parent = win.querySelector("#parent");
        const child = win.querySelector("#child");

        assert.equal(parent.contains(child), true);
        assert.equal(child.contains(parent), false);
    });

    it('should get the correct childElementCount', function () {
        win.setHtml(`<div id='parent'><div id='child1'></div><div id='child2'></div><div id='child3'></div></div>`);
        const parent = win.querySelector("#parent");

        assert.equal(parent.childElementCount, 3);
    });

    it('should compare document positions correctly', function () {
        win.setHtml(`<div id='parent'><div id='child1'></div><div id='child2'></div></div>`);
        const parent = win.querySelector("#parent");
        const child1 = win.querySelector("#child1");
        const child2 = win.querySelector("#child2");

        // child1 is contained by parent
        assert.equal(parent.compareDocumentPosition(child1) & 16, 16); // Node.DOCUMENT_POSITION_CONTAINED_BY is 16

        // parent contains child1
        assert.equal(child1.compareDocumentPosition(parent) & 8, 8); // Node.DOCUMENT_POSITION_CONTAINS is 8

        // child1 is preceding child2
        assert.equal(child1.compareDocumentPosition(child2) & 4, 4); // Node.DOCUMENT_POSITION_FOLLOWING is 4

        // child2 is following child1
        assert.equal(child2.compareDocumentPosition(child1) & 2, 2); // Node.DOCUMENT_POSITION_PRECEDING is 2
    });

    it('should insert text at specified position', function () {
        win.setHtml(`<div id='test'><span>Original</span></div>`);
        const el = win.querySelector("#test");

        el.insertAdjacentText('beforebegin', 'Before Begin');
        assert.equal(el.previousSibling.textContent, 'Before Begin');

        el.insertAdjacentText('afterbegin', 'After Begin');
        assert.equal(el.firstChild.textContent, 'After Begin');

        el.insertAdjacentText('beforeend', 'Before End');
        assert.equal(el.lastChild.textContent, 'Before End');

        el.insertAdjacentText('afterend', 'After End');
        assert.equal(el.nextSibling.textContent, 'After End');
    });

    it('should get and set name', function () {
        win.setHtml(`<input type='text' id='input' name='testName'>`);
        const input = win.querySelector("#input");
        assert.equal(input.name, 'testName');
        input.name = 'newName';
        assert.equal(input.name, 'newName');
    });

    it('should get and set src', function () {
        win.setHtml(`<img id='image' src='test.jpg'>`);
        const img = win.querySelector("#image");
        assert.equal(img.src, 'test.jpg');
        img.src = 'new.jpg';
        assert.equal(img.src, 'new.jpg');
    });

    it('should get and set href', function () {
        win.setHtml(`<a id='link' href='https://www.example.com'>Example</a>`);
        const link = win.querySelector("#link");
        assert.equal(link.href, 'https://www.example.com/');
        link.href = 'https://www.newexample.com';
        assert.equal(link.href, 'https://www.newexample.com/');
    });

    it('should get and set alt', function () {
        win.setHtml(`<img id='image' alt='testAlt'>`);
        const img = win.querySelector("#image");
        assert.equal(img.alt, 'testAlt');
        img.alt = 'newAlt';
        assert.equal(img.alt, 'newAlt');
    });

    it('should get and set title', function () {
        win.setHtml(`<div id='test' title='testTitle'>Hello World</div>`);
        const el = win.querySelector("#test");
        assert.equal(el.title, 'testTitle');
        el.title = 'newTitle';
        assert.equal(el.title, 'newTitle');
    });

    it('should get and set disabled', function () {
        win.setHtml(`<button id='button' disabled>Click me</button>`);
        const button = win.querySelector("#button");
        assert.equal(button.disabled, true);
        button.disabled = false;
        assert.equal(button.disabled, false);
    });

    it('should get and set checked', function () {
        win.setHtml(`<input type='checkbox' id='checkbox' checked>`);
        const checkbox = win.querySelector("#checkbox");
        assert.equal(checkbox.checked, true);
        checkbox.checked = false;
        assert.equal(checkbox.checked, false);
    });

    it('should get and set selected', function () {
        win.setHtml(`<select id='select'><option id='option'>Option</option><option selected=true>Option</option></select>`);
        const option = win.querySelector("#option");
        assert.equal(option.selected, false);
        option.selected = true;
        assert.equal(option.selected, true);
    });

    it('should get and set placeholder', function () {
        win.setHtml(`<input type='text' id='input' placeholder='Enter text'>`);
        const input = win.querySelector("#input");
        assert.equal(input.placeholder, 'Enter text');
        input.placeholder = 'New placeholder';
        assert.equal(input.placeholder, 'New placeholder');
    });

    it('should get and set tabIndex', function () {
        win.setHtml(`<div id='test' tabindex='1'>Hello World</div>`);
        const el = win.querySelector("#test");
        assert.equal(el.tabIndex, 1);
        el.tabIndex = 2;
        assert.equal(el.tabIndex, 2);
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
        assert.equal(input.value, 'new value');

        const form = win.querySelector("#form");
        form.reset();
        assert.equal(input.value, 'test');
    });

    it('should select text in input', function () {
        win.setHtml(`<input type='text' id='input' value='Hello World'>`);
        const input = win.querySelector("#input");
        input.select();
        assert.equal(input.selectionStart, 0);
        assert.equal(input.selectionEnd, 11);
    });

    it('should get attributes', function () {
        win.setHtml(`<div id='test' data-custom='initial' class='test-class'></div>`);
        const el = win.querySelector("#test");
        const attributes = el.attributes;
        assert.equal(attributes.length, 3);
        assert.equal(attributes[0].name, 'id');
        assert.equal(attributes[0].value, 'test');
        assert.equal(attributes[1].name, 'data-custom');
        assert.equal(attributes[1].value, 'initial');
        assert.equal(attributes[2].name, 'class');
        assert.equal(attributes[2].value, 'test-class');
    });

    it('should set attribute', function () {
        win.setHtml(`<div id='test'></div>`);
        const el = win.querySelector("#test");
        el.setAttribute('data-custom', 'updated');
        const attributes = el.attributes;
        assert.equal(attributes.length, 2);
        assert.equal(attributes[0].name, 'id');
        assert.equal(attributes[0].value, 'test');
        assert.equal(attributes[1].name, 'data-custom');
        assert.equal(attributes[1].value, 'updated');
    });

    it('should check attribute existence', function () {
        win.setHtml(`<div id='test' data-custom='initial'></div>`);
        const el = win.querySelector("#test");
        assert.equal(el.hasAttribute('data-custom'), true);
        el.removeAttribute('data-custom');
        assert.equal(el.hasAttribute('data-custom'), false);
    });

    it('should remove attribute', function () {
        win.setHtml(`<div id='test' data-custom='initial'></div>`);
        const el = win.querySelector("#test");
        el.removeAttribute('data-custom');
        const attributes = el.attributes;
        assert.equal(attributes.length, 1);
    });

    it('should check if element has attributes', function () {
        win.setHtml(`<div id='test' data-custom='initial' class='test-class'></div>`);
        const el = win.querySelector("div");
        assert.equal(el.hasAttributes(), true);
        el.removeAttribute('data-custom');
        el.removeAttribute('class');
        assert.equal(el.hasAttributes(), true);
        el.removeAttribute('id');
        assert.equal(el.hasAttributes(), false);
    });

    it('should get attribute names', function () {
        win.setHtml(`<div id='test' data-custom='initial' class='test-class'></div>`);
        const el = win.querySelector("#test");
        const attributeNames = el.getAttributeNames();
        assert.deepEqual(attributeNames, ['id', 'data-custom', 'class']);
    });

    it('should scroll element using scroll', function () {
        win.setHtml(`<div id='container' style='height: 100px; overflow: auto;'>
                        <div id='test' style='margin-top: 200px;'>Hello World</div>
                     </div>`);
        const container = win.querySelector("#container");
        const el = win.querySelector("#test");
        assert.equal(container.scrollTop, 0);
        container.scroll(0, 200);
        assert.greaterThan(container.scrollTop, 110);
    });

    it('should scroll element into view using scrollIntoView', function () {
        win.setHtml(`<div id='container' style='height: 100px; overflow: auto;'>
                        <div id='test' style='margin-top: 200px;'>Hello World</div>
                     </div>`);
        const container = win.querySelector("#container");
        const el = win.querySelector("#test");
        assert.equal(container.scrollTop, 0);
        el.scrollIntoView();
        assert.greaterThan(container.scrollTop, 110);
    });

    it('should scroll element into view if needed using scrollIntoViewIfNeeded', function () {
        win.setHtml(`<div id='container' style='height: 100px; overflow: auto;'>
                        <div id='test' style='margin-top: 200px;'>Hello World</div>
                     </div>`);
        const container = win.querySelector("#container");
        const el = win.querySelector("#test");
        assert.equal(container.scrollTop, 0);
        el.scrollIntoViewIfNeeded();
        assert.greaterThan(container.scrollTop, 110);
    });

    it('should scroll element using scrollTo', function () {
        win.setHtml(`<div id='container' style='height: 100px; overflow: auto;'>
                        <div id='test' style='margin-top: 200px;'>Hello World</div>
                     </div>`);
        const container = win.querySelector("#container");
        assert.equal(container.scrollTop, 0);
        container.scrollTo(0, 200);
        assert.greaterThan(container.scrollTop, 110);
    });
});

test.run(console.DEBUG);