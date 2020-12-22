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
