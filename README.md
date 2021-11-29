# Proxy.js

A collection of useful JavaScript Proxy utilities.

## Installation

`npm install @soulofmischief/proxy.js`

## Methods

### after

```ecmascript 6
after( model, callback = () => null, passValue = false )
```

Execute a callback after each property access or assignment.

#### Usage

```ecmascript 6
import { after } from '@soulofmischief/proxy.js'

// Log each property access.
const proxy = after( obj, console.log, true )

proxy.val
// undefined
```

#### Parameters

**model** `object`

Object to proxy.

**callback** `function`

Callback to execute after each access.

**passValue** `boolean`

Pass the computed value to the callback.

### before

```ecmascript 6
before( model, callback = () => null, passValue = false )
```

Execute a callback before each property access or assignment.

#### Usage

```ecmascript 6
import { before } from '@soulofmischief/proxy.js'

// Log each property access.
const proxy = before( obj, console.log, true )

proxy.val = 'test'
// 'test'
```

#### Parameters

**model** `object`

Object to proxy.

**callback** `function`

Callback to execute before each access.

**passValue** `boolean`

Pass the provided value to the callback.

### log

```ecmascript 6
log( model, { exclude: '', include: '', logger: console.log })
```

Log each property access or assignment.

#### Usage

```ecmascript 6
import { log } from '@soulofmischief/proxy.js'

// Log each property access.
const proxy = log( obj )

proxy.val
// GET val
// undefined
```

#### Parameters

**model** `object`

Object to log.

**options.include** `string|Array<string>`

Access types to include.

**options.exclude** `string|Array<string>`

Access types to exclude.

**options.logger** `function`

Logging callback.


### store

```ecmascript 6
store[ key ] = val
```

JSON-serialized shallow store using `localStorage`.

#### Usage

```ecmascript 6
import { store } from '@soulofmischief/proxy.js'

// Store a value.
store.test = { key: 'value' }

// Retrieve value.
console.log( store.test )
// { key: 'value' }
```
