# attempt

Type safe error handling in one-line

## Install

```sh
npm i @jill64/attempt
```

```js
import { attempt } from '@jill64/attempt'
```

## Usage

Include error objects in the return value with a syntax similar to `Lodash.attempt`.  
Objects other than error instances are not captured.

```js
// object | Error
const result = attempt(() => JSON.parse('Invalid JSON'))
```

---

Asynchronous functions can also be used.  
Objects other than error instances are not captured.  
Errors may be returned either synchronously or asynchronously.  
See [here](##Appendix) for details.

```js
// Promise<object> | Promise<Error> | Error
const result = attempt(async () => JSON.parse('Invalid JSON'))
```

---

Returns the object specified as the second argument when an error is caught.  
Objects other than error instances are not captured.

```js
// object | null
const result = attempt(() => JSON.parse('Invalid JSON'), null)
```

---

Executes the callback specified in the second argument when an error is caught.  
The item filtered as an error instance is passed as the first argument of the callback.

```js
// object | (string(error.message) | undefined)
const result = attempt(
  () => JSON.parse('Invalid JSON'),
  (error) => error?.message
)
```

---

The raw thrown object is passed as the second argument to the callback.

```js
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

### Why is an asynchronous function not returned as a Promise<Error> when specified?

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

---

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

## License

MIT
