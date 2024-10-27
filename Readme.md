## Introduction

`fib-driver` is a powerful and versatile driver designed for manipulating GUI elements, built on top of the `gui` module. It provides an extensive set of functionalities that make GUI element manipulation more convenient and efficient. This module is particularly useful for developers who need to automate interactions with graphical user interfaces, whether for testing, web scraping, or other automation tasks.

### Overview

The `fib-driver` module extends the capabilities of the `gui` module by adding a wide range of methods and properties that allow for detailed and precise control over GUI elements. With `fib-driver`, you can easily query, manipulate, and interact with elements in a window, making it an invaluable tool for a variety of use cases.

### Features

#### 1. Comprehensive Element Selection

`fib-driver` provides a robust set of methods for selecting elements within a window. These methods include `querySelector`, `querySelectorAll`, `getElementById`, `getElementsByClassName`, `getElementsByTagName`, and `getElementsByName`. These methods allow you to select elements using CSS selectors, IDs, class names, tag names, and name attributes, giving you the flexibility to target specific elements with precision.

#### 2. Extended Element Properties

The module extends a wide range of element properties, including `alt`, `checked`, `className`, `clientHeight`, `clientWidth`, `disabled`, `href`, `id`, `innerHTML`, `innerText`, `name`, `offsetHeight`, `offsetWidth`, `scrollHeight`, `scrollWidth`, `src`, `tagName`, `textContent`, `title`, and `value`. These properties provide detailed information about the elements and allow you to get and set their values as needed.

#### 3. Enhanced Element Methods

`fib-driver` enhances the functionality of elements by adding methods such as `blur`, `click`, `focus`, `getAttribute`, `setAttribute`, `removeAttribute`, `scrollIntoView`, `select`, and `submit`. These methods enable you to perform a wide range of actions on elements, from simulating user interactions to manipulating element attributes and properties.

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

### `win.querySelectorAll(selector)`
Queries the window for all elements matching the selector.

- selector (string): CSS selector.

### `win.getElementById(id)`
Returns the element with the specified ID.

- id (string): The ID of the element.

### `win.getElementsByClassName(className)`
Returns a collection of elements with the specified class name.

- className (string): The class name of the elements.

### `win.getElementsByTagName(tagName)`
Returns a collection of elements with the specified tag name.

- tagName (string): The tag name of the elements.

### `win.getElementsByName(name)`
Returns a collection of elements with the specified name attribute.

- name (string): The name attribute of the elements.

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

### Using `forEach`, `map`, `filter`, `reduce`, `some`, and `every` Methods

`fib-driver` extends the returned collections with array-like methods such as `forEach`, `map`, `filter`, `reduce`, `some`, and `every`. Here are some examples demonstrating their usage:

```JavaScript
const gui = require('gui');
require('fib-driver');

const win = gui.open('http://example.com', { width: 800, height: 600 });

// Using forEach to log each element's text content
const elements = win.querySelectorAll(".item");
elements.forEach(element => {
    console.log(element.textContent);
});

// Using map to create an array of element IDs
const ids = elements.map(element => element.id);
console.log(ids);

// Using filter to get elements with a specific class
const filteredElements = elements.filter(element => element.className.includes('active'));
filteredElements.forEach(element => {
    console.log(element.textContent);
});

// Using reduce to concatenate all element texts
const concatenatedText = elements.reduce((acc, element) => acc + element.textContent, '');
console.log(concatenatedText);

// Using some to check if any element has a specific class
const hasActiveClass = elements.some(element => element.className.includes('active'));
console.log(hasActiveClass);

// Using every to check if all elements have a specific class
const allHaveActiveClass = elements.every(element => element.className.includes('active'));
console.log(allHaveActiveClass);
```

These examples demonstrate how you can leverage the extended array-like methods on collections returned by `fib-driver` to perform various operations on GUI elements.

## Running Tests
You can run tests to verify the functionality of `fib-driver`:
```sh
fibjs test
```

## Use Cases

### Automated Testing
`fib-driver` can be used to automate the testing of web applications by simulating user interactions with GUI elements.

**Example:**
```JavaScript
const gui = require('gui');
require('fib-driver');

const win = gui.open('http://example.com', { width: 800, height: 600 });

// Simulate user clicking a button
const button = win.querySelector("#submit-button");
button.click();

// Verify the result after button click
const result = win.querySelector("#result");
console.log(result.innerText); // Output the result text
```

### Web Scraping
`fib-driver` can be used to scrape data from web pages by navigating through the DOM and extracting the required information.

**Example:**
```JavaScript
const gui = require('gui');
require('fib-driver');

const win = gui.open('http://example.com', { width: 800, height: 600, visible: false });

// Get all article titles
const titles = win.querySelectorAll(".article-title");
titles.forEach(title => {
    console.log(title.innerText); // Output each title
});
```

### GUI Automation
`fib-driver` can automate repetitive tasks in GUI applications, such as filling out forms or clicking buttons.

**Example:**
```JavaScript
const gui = require('gui');
require('fib-driver');

const win = gui.open('http://example.com/form', { width: 800, height: 600 });

// Automatically fill out a form
const nameInput = win.querySelector("#name");
nameInput.value = 'John Doe';

const emailInput = win.querySelector("#email");
emailInput.value = 'john.doe@example.com';

// Submit the form
const submitButton = win.querySelector("#submit");
submitButton.click();
```

### Data Extraction
`fib-driver` can be used to extract data from web pages for further processing or analysis.

**Example:**
```JavaScript
const gui = require('gui');
require('fib-driver');

const win = gui.open('http://example.com/data', { width: 800, height: 600 });

// Extract table data
const rows = win.querySelectorAll("table tr");
rows.forEach(row => {
    const cells = row.querySelectorAll("td");
    const rowData = cells.map(cell => cell.innerText);
    console.log(rowData.join(", ")); // Output each row's data
});
```