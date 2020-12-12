'use strict'

const { EventEmitter } = require('events')

const {
  eventLoopUtilization
} = require('perf_hooks').performance

module.exports = onIdle

function onIdle (opts) {
  if (!eventLoopUtilization) {
    process.emitWarning(`onIdle events not supported by Node.js ${process.version}`)
    return
  }

  const emitter = new EventEmitter()
  const options = Object.assign({}, {
    idleLimit: 2000,
    throttling: 10000,
    sampleInterval: 1000
  }, opts)

  const timer = setInterval(checkIdle, options.sampleInterval)
  timer.unref()

  let elu
  let lastTrigger = 0
  elu = eventLoopUtilization().idle

  return emitter

  function checkIdle () {
    elu = eventLoopUtilization(elu).idle

    if (elu >= options.idleLimit && time() - lastTrigger >= options.throttling) {
      emitter.emit('idle', elu)
      lastTrigger = time()
    }
  }
}

function time () {
  const ts = process.hrtime()
  return (ts[0] * 1e3) + (ts[1] / 1e6)
}

/**
 * TODO As optimization check if this logic:
 * const cicleCap = options.throttling / options.sampleInterval
 * would be faster than running time() many times
 */
