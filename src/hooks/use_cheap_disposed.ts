/* IMPORT */

import useCleanup from './use_cleanup'

/* MAIN */

const useCheapDisposed = (): (() => boolean) => {
  let disposed = false

  const get = (): boolean => disposed
  const set = (): boolean => (disposed = true)

  useCleanup(set)

  return get
}

/* EXPORT */

export default useCheapDisposed
