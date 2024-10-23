# fib-driver
------------

## Introduction
`fib-driver` is a driver for manipulating GUI elements, based on the `gui` module. It provides extended functionalities to make GUI element manipulation more convenient.

## Installation
Ensure you have the `fibjs` installed, then install `fib-driver` using the following command:

```sh
fibjs --install fib-driver
```
## Basic Usage

Below is a simple example demonstrating how to use `fib-driver`:
```JavaScript
const gui = require('gui');
require('fib-driver');

const win = gui.open('http://example.com', { width: 800, height: 600 });

const el = win.querySelector("#test");
el.click();
```

## API Reference

### `win.querySelector(selector)`
Queries the window for the first element matching the selector.

- selector (string): CSS selector.

### Element Properties

`fib-driver` extends the following element properties:

- alt
- checked
- childElementCount
- className
- clientHeight
- clientLeft
- clientTop
- clientWidth
- disabled
- href
- id
- innerHTML
- innerText
- length
- name
- offsetHeight
- offsetLeft
- offsetTop
- offsetWidth
- outerHTML
- placeholder
- scrollHeight
- scrollLeft
- scrollTop
- scrollWidth
- selected
- selectionEnd
- selectionStart
- src
- tabIndex
- tagName
- textContent
- title
- value

### Element Objects

`fib-driver` extends the following element objects:

- attributes
- children
- childNodes
- classList
- firstChild
- firstElementChild
- lastChild
- lastElementChild
- nextElementSibling
- nextSibling
- parentNode
- parentElement
- previousElementSibling
- previousSibling

### Element Methods

`fib-driver` extends the following element methods:

- blur()
- click()
- compareDocumentPosition()
- contains()
- focus()
- getAttribute()
- getAttributeNames()
- hasAttribute()
- hasAttributes()
- insertAdjacentHTML()
- insertAdjacentText()
- remove()
- removeAttribute()
- removeChild()
- reset()
- scroll()
- scrollIntoView()
- scrollIntoViewIfNeeded()
- scrollTo()
- select()
- setAttribute()
- submit()

## Examples

Here are some examples of using `fib-driver`:

### Getting and Setting Properties

```JavaScript
const input = win.querySelector("#input");
console.log(input.value); // Get value
input.value = 'new value'; // Set value
```
### Calling Methods
```JavaScript
const button = win.querySelector("#button");
button.click(); // Click button
```

## Running Tests
You can run tests to verify the functionality of `fib-driver`:
```sh
fibjs test
```