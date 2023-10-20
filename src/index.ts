const isPromise = <T>(obj: unknown): obj is Promise<T> =>
  !!obj &&
  (typeof obj === 'object' || typeof obj === 'function') &&
  'then' in obj &&
  typeof obj.then === 'function'

type MaybePromise<T> = Promise<T> | T

type FallbackValue =
  | null
  | undefined
  | number
  | string
  | bigint
  | boolean
  | object

type ErrorHandler = (error: Error | null, projectile: unknown) => unknown

type Fallback = FallbackValue | ErrorHandler

type FallbackReturn<T> = T extends ErrorHandler ? ReturnType<T> : T

// Without Fallback

// Never
export function attempt(func: () => never): Error

// Never Promise
export function attempt(func: () => Promise<never>): MaybePromise<Error>

// Promise
export function attempt<T extends Promise<unknown>>(
  func: () => T
): T | MaybePromise<Error>

// Scalar
export function attempt<T>(func: () => T): T | Error

// With Fallback

// Never Promise
export function attempt<U extends Fallback>(
  func: () => Promise<never>,
  fallback: U
): MaybePromise<FallbackReturn<U>>

// Never
export function attempt<U extends Fallback>(
  func: () => never,
  fallback: U
): FallbackReturn<U>

// Promise
export function attempt<T extends Promise<unknown>, U extends Fallback>(
  func: () => T,
  fallback: U
): T | MaybePromise<FallbackReturn<U>>

// Scalar
export function attempt<T, U extends Fallback>(
  func: () => T,
  fallback: U
): T | FallbackReturn<U>

// Implementation
export function attempt<T, U>(func: () => T, fallback?: U) {
  const argLen = arguments.length

  const handle = (error: unknown) => {
    // Without Fallback
    if (argLen === 1) {
      if (error instanceof Error) {
        return error
      }
      throw error
    }

    // With Fallback
    return typeof fallback === 'function'
      ? fallback(error instanceof Error ? error : null, error)
      : fallback
  }

  try {
    const result = func()
    return isPromise(result) ? result.then((_) => _, handle) : result
  } catch (error) {
    return handle(error)
  }
}
