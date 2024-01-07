/* IMPORT */

import SuspenseContext from './suspense.context'
import useMemo from '../hooks/use_memo'
import useSuspense from '../hooks/use_suspense'
import $$ from '../methods/SS'
import resolve from '../methods/resolve'
import { ternary } from '../oby'
import type { Child, FunctionMaybe, ObservableReadonly } from '../types'

/* MAIN */

const Suspense = ({
  when,
  fallback,
  children,
}: {
  when?: FunctionMaybe<unknown>
  fallback?: Child
  children: Child
}): ObservableReadonly<Child> => {
  return SuspenseContext.wrap((suspense) => {
    const condition = useMemo(() => !!$$(when) || suspense.active())

    const childrenSuspended = useSuspense(condition, () => resolve(children))

    return ternary(condition, fallback, childrenSuspended)
  })
}

/* EXPORT */

export default Suspense
