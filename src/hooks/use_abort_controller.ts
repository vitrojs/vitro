/* IMPORT */

import useCleanup from './use_cleanup'
import useEventListener from './use_event_listener'
import type { ArrayMaybe } from '../types'
import { castArray } from '../utils/lang'

/* MAIN */

const useAbortController = (
  signals: ArrayMaybe<AbortSignal> = [],
): AbortController => {
  signals = castArray(signals)

  const controller = new AbortController()
  const abort = controller.abort.bind(controller)
  const aborted = signals.some((signal) => signal.aborted)

  if (aborted) {
    abort()
  } else {
    signals.forEach((signal) => useEventListener(signal, 'abort', abort))

    useCleanup(abort)
  }

  return controller
}

/* EXPORT */

export default useAbortController
