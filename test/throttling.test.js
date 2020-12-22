'use strict'

const t = require('tap')
const onIdle = require('../index')

const noop = () => {}

t.test('throttling', t => {
  const ee = onIdle({
    idleLimit: 50,
    throttling: 1000,
    sampleInterval: 500
  })

  let count = 0
  ee.on('idle', function (ms) {
    t.ok(ms, `${ms} ms`)
    count++
  })

  const myApplication = setInterval(noop, 1)

  setTimeout(function () { t.equal(count, 1) }, 1000)
  setTimeout(function () {
    t.equal(count, 5)
    t.end()
    clearInterval(myApplication)
  }, 6000)
})
