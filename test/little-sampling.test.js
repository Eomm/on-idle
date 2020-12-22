'use strict'

const t = require('tap')
const onIdle = require('../index')

const noop = () => {}

t.test('onIdle small sampling and limit', t => {
  t.plan(1)
  const ee = onIdle({
    idleLimit: 500,
    sampleInterval: 10
  })

  ee.on('idle', function (idleMs) {
    t.ok(idleMs <= 600, idleMs)
    t.end()
    clearInterval(myApplication)
  })
  const myApplication = setInterval(noop, 1)
})
