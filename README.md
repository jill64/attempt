<!----- BEGIN GHOST DOCS HEADER ----->

# attempt

[![npm-version](https://img.shields.io/npm/v/@jill64/attempt)](https://npmjs.com/package/@jill64/attempt) [![npm-license](https://img.shields.io/npm/l/@jill64/attempt)](https://npmjs.com/package/@jill64/attempt) [![npm-download-month](https://img.shields.io/npm/dm/@jill64/attempt)](https://npmjs.com/package/@jill64/attempt) [![npm-min-size](https://img.shields.io/bundlephobia/min/@jill64/attempt)](https://npmjs.com/package/@jill64/attempt) [![ci.yml](https://github.com/jill64/attempt/actions/workflows/ci.yml/badge.svg)](https://github.com/jill64/attempt/actions/workflows/ci.yml) [![codecov-coverage](https://codecov.io/gh/jill64/attempt/graph/badge.svg)](https://codecov.io/gh/jill64/attempt)

➖ Type safe error handling in one-line

## Install

```sh
npm i @jill64/attempt
```

<!----- END GHOST DOCS HEADER ----->

## Usage

Include error objects in the return value with a syntax similar to `Lodash.attempt`.  
Objects other than error instances are not captured.

```js
import { attempt } from '@jill64/attempt'

// object | Error
const result = attempt(() => JSON.parse('Invalid JSON'))
```

### Promise

Asynchronous functions can also be used.  
Objects other than error instances are not captured.  
Errors may be returned either synchronously or asynchronously.  
See [here](##-Appendix) for details.

```js
import { attempt } from '@jill64/attempt'

// Promise<object> | Promise<Error> | Error
const result = attempt(async () => JSON.parse('Invalid JSON'))
```

### Fallback Value

Returns the object specified as the second argument when an error is caught.  
Objects other than error instances are not captured.

```js
import { attempt } from '@jill64/attempt'

// object | null
const result = attempt(() => JSON.parse('Invalid JSON'), null)
```

### Fallback Function

Executes the callback specified in the second argument when an error is caught.  
The item filtered as an error instance is passed as the first argument of the callback.

```js
import { attempt } from '@jill64/attempt'

// object | (string(error.message) | undefined)
const result = attempt(
  () => JSON.parse('Invalid JSON'),
  (error) => error?.message
)
```

### Catch All Fallback Function

The raw thrown object is passed as the second argument to the callback.  

```js
import { attempt } from '@jill64/attempt'

// object | 'Syntax Error' | null
const result = attempt(
  () => JSON.parse('Invalid JSON'),
  (error, projectile) => {
    if (error instanceof SyntaxError) {
      return 'Syntax Error'
    }
    console.error('Unknown Object', projectile)
    return null
  }
)
```

## Appendix

### Why is an asynchronous function not returned as a `Promise<Error>` when specified?

Asynchronous function to Reject

```js
// () => Promise<object>
const func = async () => {
  try {
    JSON.parse('Invalid JSON')
  } catch {
    throw new Error('Error')
  }
}

// Assign `null` by catch reject
const result = func().catch(() => null)

// `null`
return result
```

Asynchronous function that throws an error immediately (does not Reject)

```js
// () => Promise<object>
const func = () => {
  try {
    const obj = JSON.parse('Invalid JSON')

    return new Promise(
      (resolve) => resolve(obj),
      (reject) => reject('Reject')
    )
  } catch {
    throw new Error('Error')
  }
}

// Error: Not Reject Error (Can't catch)
const result = func().catch(() => null)

return result
```

Although this is catchable in JavaScript syntax, it is actually thrown synchronously and cannot be caught.  
Also, there is no way to check if a `Promise` is returned before the function is executed.  
Therefore, the error return value of an asynchronous function is always `Error | Promise<Error>`.
