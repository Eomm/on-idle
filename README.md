# on-idle

[![Build Status](https://github.com/Eomm/on-idle/workflows/ci/badge.svg)](https://github.com/Eomm/on-idle/actions)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

Trigger an `idle` event when the Node.js process is in the idle status!

You need Node.js >= 12.9.0 to run this module since [`perf_hooks`](https://nodejs.org/api/perf_hooks.html#perf_hooks_performance_eventlooputilization_utilization1_utilization2) are used under the hood.

## Usage

The `idle` event is fired no more than 1 time every `throttling`ms and only when `idleLimit`ms has been expired.
The check of the limit is performed every `sampleInterval`ms.

```js
const onIdle = require('on-idle')

const eventEmitter = onIdle()
eventEmitter.on('idle', function (idleMs) {
  // do some stuff when the process is in idle
})

// You can set the options like this:
const eventEmitter = onIdle({
  idleLimit: 2000, // default value
  throttling: 10000, // default value
  sampleInterval: 1000 // default value
})
```

## License

Licensed under [MIT](./LICENSE).
