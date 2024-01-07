/* IMPORT */

import useGuarded from '../hooks/use_guarded'
import useUntracked from '../hooks/use_untracked'
import isObservable from '../methods/is_observable'
import { ternary } from '../oby'
import type { Child, FunctionMaybe, ObservableReadonly, Truthy } from '../types'
import { isComponent, isFunction, isTruthy } from '../utils/lang'

/* MAIN */

//TODO: Support an is/guard prop, maybe

const If = <T>({
  when,
  fallback,
  children,
}: {
  when: FunctionMaybe<T>
  fallback?: Child
  children: Child | ((value: () => Truthy<T>) => Child)
}): ObservableReadonly<Child> => {
  if (
    isFunction(children) &&
    !isObservable(children) &&
    !isComponent(children)
  ) {
    // Calling the children function with an (() => Truthy<T>)

    const truthy = useGuarded(when, isTruthy)

    return ternary(
      when,
      useUntracked(() => children(truthy)),
      fallback,
    )
  } else {
    // Just passing the children along

    return ternary(when, children as Child, fallback) //TSC
  }
}

/* EXPORT */

export default If
