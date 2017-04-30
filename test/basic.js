const assert = require('assert')
const domify = require('..')

describe('domify tagged template string', function() {
  it('should return a DOM node', function() {
    let node = domify`<span></span>`
    assert.ok(node instanceof Node)
    assert.equal(node.tagName, "SPAN")
    assert.equal(node.ownerDocument, document)
  })

  it('should replace attributes values', function() {
    let obj = {
      style: 'color:red',
      text: 'awesome'
    }
    let node = domify`<span style="${obj.style}">${obj.text}</span>`
    assert.equal(node.innerHTML, obj.text)
    assert.equal(node.attributes.style.value, 'color:red')
    assert.equal(node.style.color, 'red')
  })
})

