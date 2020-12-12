'use strict'

const t = require('tap')
const onIdle = require('../index')

const noop = () => {}

t.test('onIdle default settings', t => {
  t.plan(1)
  const ee = onIdle()

  ee.on('idle', function (idleMs) {
    t.ok(idleMs >= 1000, idleMs)
    t.end()
    clearInterval(myApplication)
  })
  const myApplication = setInterval(noop, 1)
})

t.test('throttling', t => {
  t.plan(1)
  const ee = onIdle({
    idleLimit: 50,
    throttling: 1000,
    sampleInterval: 600
  })

  let count = 0
  ee.on('idle', function (x) {
    console.log(x)
    count++
  })

  const myApplication = setInterval(noop, 1)

  setTimeout(function () { t.equal(count, 1) }, 1100)
  setTimeout(function () {
    t.equal(count, 5)
    t.end()
    clearInterval(myApplication)
  }, 5100)
})
