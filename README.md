# domify-template-strings

> Interpolate DOM Nodes into ES2015 Template Strings

This package contains a tiny tag function for ES2015 template strings. It takes an HTML string and returns a `Node` object.

## Installation
```bash
npm install --save domify-template-strings
```

## Usage
The real fun part of creating pieces of DOM in JavaScript comes when you want to use things like event listeners on single elements. They can be a real pain if you want to set up your DOM tree in a declarative way if you don't want to use a full blown templating language or framework.

But with the right tag function, ES2015 template strings allow you to go for it just like that:

```javascript
const domify = require('domify-template-strings')

const loginBtn = domify `<button>login</button>`
loginBtn.onclick = () => {
  alert('You have been logged in!')
}

document.body.appendChild(
  domify `<p>Click here to ${loginBtn}!</p>`
)
```

The interpolated values the `domify` function handles are

1. DOM `Node` objects, which will be inserted at the corresponding slot in the DOM tree.
2. Arrays, which will be handled recursively.

All other values will be passed like in usual template strings.

### Example with arrays

```javascript
const domify = require('domify-template-strings')

const items = [ 'One', 'Two', 'Three' ]

const list = domify `<ul>${items.map(label => {
  const removeBtn = domify `<button>X</button>`
  const node = domify `<li>${label} ${removeBtn}</li>`

  removeBtn.onclick = () => node.remove()

  return node
})}</ul>`

document.body.appendChild(list)
```

Just as an example. I'm not suggesting managing your application state through the DOM. :)

### Multiple root nodes

The above only works if you pass an HTML string with exactly one root node. If you have the need to go for multiple root nodes, you can use `domifiy.list` to get an array of Nodes:

```javascript
const domifiy = require('domify-template-strings')

domifiy.list(`<p>One</p><p>Two</p><p>One</p>`).appendTo(document.body)
```

As you can see, the returned array also has an `.appendTo()` method for convenience.